import os

import numpy as np
import pandas as pd
import streamlit as st
from ydata_profiling import ProfileReport
from streamlit_pandas_profiling import st_profile_report

from pycaret.clustering import ClusteringExperiment
from pycaret.regression import RegressionExperiment
from pycaret.classification import ClassificationExperiment

if os.path.exists("data/dataset.csv"):
    df = pd.read_csv("data/dataset.csv", index_col=None)

with st.sidebar:
    st.title("NeuroWeb")
    choice = st.radio("Navigation", ["Upload", "Profiling", "Modelling", "Download"])
    st.info("This project is part of NeuroWeb platform that allows you receive the best machine learning model")

if choice == "Upload":
    st.title("Upload Your Dataset")
    file = st.file_uploader("Upload Your Dataset")
    if file:
        df = pd.read_csv(file, index_col=None)
        df.to_csv("data/dataset.csv", index=None)
        st.dataframe(df)

if choice == "Profiling":
    st.title("Exploratory Data Analysis")
    profile_df = ProfileReport(df, title="Profiling Report")
    st_profile_report(profile_df)

if choice == "Modelling":
    mdl = st.selectbox("Choose Modelling Type : ", ["Classification", "Regression", "Clustering"])
    if mdl == "Clustering":
        clustering_models = {
            "K-Means Clustering": "kmeans",
            "Affinity Propagation": "ap",
            "Mean shift Clustering": "meanshift",
            "Spectral Clustering": "sc",
            "Agglomerative Clustering": "hclust",
            "Density-Based Spatial Clustering": "dbscan",
            "OPTICS Clustering": "optics",
            "Birch Clustering": "birch",
            "K-Modes Clustering": "kmodes"
        }
        clustering_model = st.selectbox("Select model for clustering",
                                        clustering_models.keys(), key="clustering_model")
    else:
        chosen_target = st.selectbox("Choose the Target Column : ", df.columns)

    configure_flg = st.toggle("Start Configuring", key="configure_flg")

    if configure_flg:
        train_size = st.select_slider(label="Select train size", options=np.arange(0.00, 1.0, 0.01), value=0.65)

        num_features = st.multiselect("Select numerical features", df.columns, key="num_features")
        cat_features = st.multiselect("Select categorical features", list(set(df.columns) - set(num_features)),
                                      key="cat_features")
        date_features = st.multiselect("Select date type features", list(set(df.columns) - set(num_features) -
                                                                         set(cat_features)),
                                       key="date_features")
        text_features = st.multiselect("Select text features", list(set(df.columns) - set(num_features) -
                                                                    set(cat_features) - set(date_features)),
                                       key="text_features")

        keep_features = st.multiselect("Select features that never would dropped", df.columns, key="keep_features")
        ignore_features = st.multiselect("Select features that would ignored",
                                         list(set(df.columns) - set(keep_features)), key="ignore_features")

        numeric_imputation = st.selectbox("Select imputing strategy for numerical columns.",
                                          ["mean", "drop", "median", "mode",
                                           "knn", "custom_value"], key="numeric_imputation")
        numeric_imputation_custom_value = None
        if numeric_imputation == "custom_value":
            numeric_imputation_custom_value = st.text_input("Type value for numerical fillna", "NaN",
                                                            key="numeric_imputation_custom_value")

        categorical_imputation = st.selectbox("Select imputing strategy for categorical columns.",
                                              ["mode", "drop", "custom_value"], key="categorical_imputation")
        categorical_imputation_custom_value = None
        if categorical_imputation == "custom_value":
            categorical_imputation_custom_value = st.text_input("Type value for categorical fillna", "NaN",
                                                                key="categorical_imputation_custom_value")

        polynomial_features = st.checkbox("Flag of using features that derived using existing numeric features",
                                          key="polynomial_features")
        polynomial_degree = 2
        if polynomial_features:
            polynomial_degree = st.number_input("Select degree of polynomial features", 2,
                                                key="polynomial_degree")

        remove_multicollinearity = st.checkbox("Flag of removing features with multicollinearity",
                                               key="remove_multicollinearity")
        multicollinearity_threshold = 2
        if remove_multicollinearity:
            multicollinearity_threshold = st.select_slider(label="multicollinearity_threshold",
                                                           options=np.arange(0.00, 1.0, 0.01), value=0.9,
                                                           key="multicollinearity_threshold")

        transformation = st.checkbox("Flag of using Gaussian-like transformation", key="transformation")
        normalize = st.checkbox("Flag of using normalization", key="normalize")
        normalize_method = 2
        if normalize:
            normalize_method = st.selectbox("Select imputing strategy for categorical columns.",
                                            ["minmax", "maxabs", "robust"], key="normalize_method")

        pca = st.checkbox("Flag of using pca", key="pca")
        feature_selection = st.checkbox("Flag of using feature_selection", key="feature_selection")
        n_features_to_select = 0.9
        if feature_selection:
            n_features_to_select = st.select_slider(label="The maximum number of features to select",
                                                    options=np.arange(0.00, 1.0, 0.01), value=0.9,
                                                    key="n_features_to_select")

    if st.button("Start Modelling"):
        if mdl == "Classification":
            s = ClassificationExperiment()

            if configure_flg:
                s.setup(df,
                        target=chosen_target,
                        session_id=123,
                        train_size=train_size,
                        numeric_features=num_features,
                        categorical_features=cat_features,
                        date_features=date_features,
                        text_features=text_features,
                        keep_features=keep_features,
                        ignore_features=ignore_features,
                        numeric_imputation=numeric_imputation if numeric_imputation != "custom_value" else numeric_imputation_custom_value,
                        categorical_imputation=categorical_imputation if categorical_imputation != "custom_value" else categorical_imputation_custom_value,
                        polynomial_features=polynomial_features,
                        polynomial_degree=polynomial_degree,
                        remove_multicollinearity=remove_multicollinearity,
                        multicollinearity_threshold=multicollinearity_threshold,
                        transformation=transformation,
                        normalize=normalize,
                        normalize_method=normalize_method,
                        pca=pca,
                        feature_selection=feature_selection,
                        n_features_to_select=n_features_to_select)
            else:
                s.setup(df, target=chosen_target, session_id=123)

            setup_df = s.pull()
            st.dataframe(setup_df)

            best_model = s.compare_models()
            compare_df = s.pull()
            st.dataframe(compare_df)
            s.save_model(best_model, "best_model")

        if mdl == "Regression":
            s = RegressionExperiment()

            if configure_flg:
                s.setup(df,
                        target=chosen_target,
                        session_id=123,
                        train_size=train_size,
                        numeric_features=num_features,
                        categorical_features=cat_features,
                        date_features=date_features,
                        text_features=text_features,
                        keep_features=keep_features,
                        ignore_features=ignore_features,
                        numeric_imputation=numeric_imputation if numeric_imputation != "custom_value" else numeric_imputation_custom_value,
                        categorical_imputation=categorical_imputation if categorical_imputation != "custom_value" else categorical_imputation_custom_value,
                        polynomial_features=polynomial_features,
                        polynomial_degree=polynomial_degree,
                        remove_multicollinearity=remove_multicollinearity,
                        multicollinearity_threshold=multicollinearity_threshold,
                        transformation=transformation,
                        normalize=normalize,
                        normalize_method=normalize_method,
                        pca=pca,
                        feature_selection=feature_selection,
                        n_features_to_select=n_features_to_select)
            else:
                s.setup(df, target=chosen_target, session_id=123)

            setup_df = s.pull()
            st.dataframe(setup_df)

            best_model = s.compare_models()
            compare_df = s.pull()
            st.dataframe(compare_df)
            s.save_model(best_model, "best_model")

        elif mdl == "Clustering":
            s = ClusteringExperiment()

            if configure_flg:
                s.setup(df,
                        session_id=123,
                        numeric_features=num_features,
                        categorical_features=cat_features,
                        date_features=date_features,
                        text_features=text_features,
                        keep_features=keep_features,
                        ignore_features=ignore_features,
                        numeric_imputation=numeric_imputation if numeric_imputation != "custom_value" else numeric_imputation_custom_value,
                        categorical_imputation=categorical_imputation if categorical_imputation != "custom_value" else categorical_imputation_custom_value,
                        polynomial_features=polynomial_features,
                        polynomial_degree=polynomial_degree,
                        remove_multicollinearity=remove_multicollinearity,
                        multicollinearity_threshold=multicollinearity_threshold,
                        transformation=transformation,
                        normalize=normalize,
                        normalize_method=normalize_method,
                        pca=pca)
            else:
                s.setup(df, session_id=123)

            created_clustering_model = s.create_model(clustering_models[clustering_model])
            results = s.assign_model(created_clustering_model)
            st.dataframe(results)
            s.plot_model(created_clustering_model, plot="cluster", display_format="streamlit")
            s.plot_model(created_clustering_model, plot="tsne", display_format="streamlit")
            s.plot_model(created_clustering_model, plot="elbow", display_format="streamlit")
            s.plot_model(created_clustering_model, plot="silhouette", display_format="streamlit")
            s.plot_model(created_clustering_model, plot="distance", display_format="streamlit")
            s.plot_model(created_clustering_model, plot="distribution", display_format="streamlit")

if choice == "Download":
    with open("data/best_model.pkl", "rb") as f:
        st.download_button("Download Model", f, file_name="data/best_model.pkl")
