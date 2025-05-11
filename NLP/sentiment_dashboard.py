import pandas as pd
import matplotlib.pyplot as plt
import streamlit as st
from wordcloud import WordCloud
from datetime import datetime
import os
import re
from collections import Counter
from nltk import bigrams
from nltk.corpus import stopwords
from bs4 import BeautifulSoup
import requests
import nltk
import google.generativeai as genai
from dotenv import load_dotenv
import json
from transformers import pipeline

nltk.download('stopwords')
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Streamlit page setup
st.set_page_config(page_title="🌍 Pollution News Sentiment Dashboard", layout="wide")

# Load sentiment model
@st.cache_resource
def load_sentiment_model():
    return pipeline("sentiment-analysis")

sentiment_model = load_sentiment_model()

# Gemini-based summarization
def summarize_with_gemini(text):
    try:
        if not text.strip():
            return ""
        model = genai.GenerativeModel("models/gemini-1.5-flash")
        prompt = f"Summarize the following news article in a concise paragraph:\n\n{text[:8000]}"
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Summary failed: {e}"

# Sentiment analysis
def analyze_sentiment(text):
    text = text.strip()
    if not text:
        return "Neutral"
    return sentiment_model(text[:512])[0]['label']

# NLP extraction
def extract_nlp_terms(text):
    words = re.findall(r'\w+', text.lower())
    filtered = [w for w in words if w not in stopwords.words('english') and len(w) > 3]
    counts = Counter(filtered).most_common(10)
    tags = re.findall(r'#\w+', text)
    bi = Counter(bigrams(filtered)).most_common(5)
    return counts, tags, bi

# Session state init
if "article_text" not in st.session_state:
    st.session_state.article_text = ""
    st.session_state.title = ""
    st.session_state.intro = ""
    st.session_state.author = ""
    st.session_state.date = datetime.today().date()

# UI
st.title("📰 Pollution News Sentiment Dashboard")
st.header("📤 Submit Article (Text or Web URL)")

option = st.radio("Choose input method:", ["Paste Text", "Scrape from Web"])

if option == "Paste Text":
    st.session_state.title = st.text_input("Title")
    st.session_state.intro = st.text_area("Intro Text")
    st.session_state.author = st.text_input("Author")
    st.session_state.date = st.date_input("Date Published")
    st.session_state.article_text = st.text_area("Full Article Text")

elif option == "Scrape from Web":
    url = st.text_input("Enter article URL")
    if st.button("Scrape Article") and url:
        try:
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            raw_html = soup.get_text()

            prompt = f"""
            Extract the following details from this webpage content:
            - Title
            - Introductory paragraph (short summary)
            - Author name
            - Full article text (cleaned)
            Return as JSON.

            Content:
            {raw_html[:10000]}
            """

            model = genai.GenerativeModel("models/gemini-1.5-flash")
            result = model.generate_content(prompt)

            try:
                data = json.loads(result.text)
            except:
                data = {
                    "title": soup.title.string if soup.title else "Untitled",
                    "intro": "Intro not found.",
                    "author": "Unknown",
                    "article_text": ' '.join([p.text for p in soup.find_all('p')]),
                }

            st.session_state.title = data.get("title", "Untitled")
            st.session_state.intro = data.get("intro", "")
            st.session_state.author = data.get("author", "Unknown")
            st.session_state.article_text = data.get("article_text", "")
            st.session_state.date = datetime.today().date()

            st.success("Article extracted using AI.")
            st.text_area("Extracted Text", st.session_state.article_text, height=300)

        except Exception as e:
            st.error(f"Failed to fetch article: {str(e)}")

# Analysis
if st.session_state.article_text and st.button("Analyze Article"):
    try:
        sentiment = analyze_sentiment(st.session_state.article_text)
        summary = summarize_with_gemini(st.session_state.article_text)
        keywords, hashtags, bigram_data = extract_nlp_terms(st.session_state.article_text)

        st.subheader("✅ Results")
        st.markdown(f"**Sentiment**: `{sentiment}`")
        st.markdown("**Summary:**")
        st.write(summary)

        st.markdown("**Top Keywords:**")
        st.write(pd.DataFrame(keywords, columns=["Keyword", "Frequency"]))

        st.markdown("**Hashtags Found:**")
        st.write(hashtags if hashtags else "No hashtags found.")

        st.markdown("**Top Bigrams:**")
        st.write([" ".join(b) for b, _ in bigram_data])

        st.subheader("📌 WordCloud of This Article")
        wordcloud = WordCloud(width=800, height=300, background_color='white').generate(st.session_state.article_text)
        st.image(wordcloud.to_array())

    except Exception as e:
        st.error(f"Analysis failed: {str(e)}")

# Analytics section
st.sidebar.header("📊 View Analytics")
if st.sidebar.button("Show Charts"):
    st.subheader("📈 Sentiment Distribution in Stored Articles")
    # if os.path.exists("sentiment_output.csv"):
    if os.path.exists("compressed_data.csv"):
        df = pd.read_csv("sentiment_output.csv")
        sentiment_counts = df['sentiment'].value_counts()
        fig, ax = plt.subplots()
        sentiment_counts.plot(kind='bar', color=['green', 'red', 'gray'], ax=ax)
        ax.set_title("Sentiment Distribution in Pollution-Related News")
        ax.set_xlabel("Sentiment")
        ax.set_ylabel("Number of Articles")
        st.pyplot(fig)

        # Monthly trend
        st.subheader("🕒 Sentiment Over Time")
        df['Date Published'] = pd.to_datetime(df['Date Published'], errors='coerce')
        df['month'] = df['Date Published'].dt.to_period('M')
        time_trend = df.groupby(['month', 'sentiment']).size().unstack(fill_value=0)
        fig2, ax2 = plt.subplots()
        time_trend.plot(ax=ax2)
        ax2.set_title("Monthly Sentiment Trends")
        ax2.set_ylabel("Article Count")
        st.pyplot(fig2)

        # WordCloud
        st.subheader("📌 WordCloud of Article Texts")
        wc_text = ' '.join(df['Article Text'].dropna()[:300])
        wordcloud = WordCloud(width=800, height=400, background_color='white').generate(wc_text)
        st.image(wordcloud.to_array())

        # Bigrams
        st.subheader("💬 Bigrams Across Dataset")
        words = re.findall(r'\w+', wc_text.lower())
        filtered = [w for w in words if w not in stopwords.words('english') and len(w) > 3]
        bi_dataset = Counter(bigrams(filtered)).most_common(10)
        bigram_df = pd.DataFrame([(" ".join(b), c) for b, c in bi_dataset], columns=["Bigram", "Count"])
        st.write(bigram_df)
    else:
        st.warning("No sentiment_output.csv found.")
        st.sidebar.warning("No articles analyzed yet.")
        st.sidebar.warning("Please analyze an article first.")
        st.sidebar.warning("Then click 'Show Charts' to view analytics.")
        st.markdown("**Note:** The charts will be displayed here.")