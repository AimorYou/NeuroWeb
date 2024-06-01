import os

import numpy as np
import pandas as pd
import streamlit as st
from ydata_profiling import ProfileReport
from streamlit_pandas_profiling import st_profile_report

from pycaret.clustering import ClusteringExperiment
from pycaret.regression import RegressionExperiment
from pycaret.classification import ClassificationExperiment

imputation_strategy_mapping = {
    "Удаление": "drop",
    "Среднее": "mean",
    "Медиана": "median",
    "Мода": "mode",
    "KNN": "knn"
}

if os.path.exists("data/dataset.csv"):
    df = pd.read_csv("data/dataset.csv", index_col=None)

with st.sidebar:
    st.title("NeuroWeb")
    choice = st.radio("Навигация", ["Загрузка датасета", "Анализ датасета", "Моделирование", "Экспорт"])
    st.info(
        "Данный проект является частью платформы NeuroWeb, которая позволяет построить оптимальные модели машинного обучения")

if choice == "Загрузка датасета":
    st.title("Загрузка датасета")
    file = st.file_uploader("Загрузите свой датасет")
    if file:
        df = pd.read_csv(file, index_col=None)
        df.to_csv("data/dataset.csv", index=None)
        st.dataframe(df)

if choice == "Анализ датасета":
    st.title("Анализ датасета")
    profile_df = ProfileReport(df, title="Аналитический отчет по вашему датасету")
    st_profile_report(profile_df)

if choice == "Моделирование":
    mdl = st.selectbox("Выберите задачу: ", ["Классификация", "Регрессия", "Кластеризация"])
    if mdl == "Кластеризация":
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
        clustering_model = st.selectbox("Выберите модель для кластеризации",
                                        clustering_models.keys(), key="clustering_model")
    else:
        chosen_target = st.selectbox("Выберите целевую переменную: ", df.columns, placeholder="Выберите опцию")

    configure_flg = st.toggle("Расширенные настройки", key="configure_flg")

    if configure_flg:
        train_size = st.select_slider(label="Выберите размер обучающей выборки", options=np.arange(0.00, 1.0, 0.01),
                                      value=0.65)

        num_features = st.multiselect("Укажите вещественные признаки", df.columns, key="num_features",
                                      placeholder="Выберите опцию")
        cat_features = st.multiselect("Укажите категориальные признаки", list(set(df.columns) - set(num_features)),
                                      key="cat_features")
        date_features = st.multiselect("Укажите признаки с датой", list(set(df.columns) - set(num_features) -
                                                                        set(cat_features)),
                                       key="date_features", placeholder="Выберите опцию")
        text_features = st.multiselect("Укажите текстовые признаки", list(set(df.columns) - set(num_features) -
                                                                          set(cat_features) - set(date_features)),
                                       key="text_features", placeholder="Выберите опцию")

        keep_features = st.multiselect("Укажите признаки, которые нельзя исключать", df.columns, key="keep_features",
                                       placeholder="Выберите опцию")
        ignore_features = st.multiselect("Укажите признаки, которые необходимо исключить",
                                         list(set(df.columns) - set(keep_features)), key="ignore_features",
                                         placeholder="Выберите опцию")

        numeric_imputation = st.selectbox("Выберите стратегию заполнения пропусков для числовых столбцов",
                                          ["Среднее", "Удаление", "Медиана", "Мода",
                                           "KNN", "Ввести свое значение"], key="numeric_imputation",
                                          placeholder="Выберите опцию")
        numeric_imputation = imputation_strategy_mapping.get(numeric_imputation, "Ввести свое значение")

        numeric_imputation_custom_value = None
        if numeric_imputation == "Ввести свое значение":
            numeric_imputation_custom_value = st.number_input(
                "Введите значение, которым будут заполнены пропуски в числовых столбцах", -999,
                key="numeric_imputation_custom_value")

        categorical_imputation = st.selectbox("Выберите стратегию заполнения пропусков для категориальных столбцов",
                                              ["Мода", "Удаление", "Ввести свое значение"],
                                              key="categorical_imputation", placeholder="Выберите опцию")
        categorical_imputation = imputation_strategy_mapping.get(categorical_imputation, "Ввести свое значение")

        categorical_imputation_custom_value = None
        if categorical_imputation == "Ввести свое значение":
            categorical_imputation_custom_value = st.text_input(
                "Введите значение, которым будут заполнены пропуски в категориальных столбцах", "NaN",
                key="categorical_imputation_custom_value", placeholder="Выберите опцию")

        polynomial_features = st.checkbox("Флаг использования полиномиальных признаков",
                                          key="polynomial_features")
        polynomial_degree = 2
        if polynomial_features:
            polynomial_degree = st.number_input("Введите степень полиномиальных признаков", 2,
                                                key="polynomial_degree")

        remove_multicollinearity = st.checkbox("Флаг удаления признаков с мультиколлинеарностью",
                                               key="remove_multicollinearity")
        multicollinearity_threshold = 2
        if remove_multicollinearity:
            multicollinearity_threshold = st.select_slider(label="Введите порог мультиколлинеарности",
                                                           options=np.arange(0.00, 1.0, 0.01), value=0.9,
                                                           key="multicollinearity_threshold")

        transformation = st.checkbox("Флаг использования преобразования Гаусса", key="transformation")
        normalize = st.checkbox("Флаг использования нормализации", key="normalize")
        normalize_method = 2
        if normalize:
            normalize_method = st.selectbox("Выберите вид нормализации",
                                            ["MinMax", "MaxAbs", "Robust"], key="normalize_method")
            normalize_method = normalize_method.lower()

        pca = st.checkbox("Флаг использования PCA", key="pca")
        feature_selection = st.checkbox("Флаг использования отбора признаков", key="feature_selection")
        n_features_to_select = 0.9
        if feature_selection:
            n_features_to_select = st.select_slider(label="Максимальное количество признаков, которые нужно оставить",
                                                    options=np.arange(0.00, 1.0, 0.01), value=0.9,
                                                    key="n_features_to_select")

    if st.button("Начать моделирование"):
        if mdl == "Классификация":
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
                        numeric_imputation=numeric_imputation if numeric_imputation != "Ввести свое значение" else numeric_imputation_custom_value,
                        categorical_imputation=categorical_imputation if categorical_imputation != "Ввести свое значение" else categorical_imputation_custom_value,
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

        if mdl == "Регрессия":
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
                        numeric_imputation=numeric_imputation if numeric_imputation != "Ввести свое значение" else numeric_imputation_custom_value,
                        categorical_imputation=categorical_imputation if categorical_imputation != "Ввести свое значение" else categorical_imputation_custom_value,
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

        elif mdl == "Кластеризация":
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
                        numeric_imputation=numeric_imputation if numeric_imputation != "Ввести свое значение" else numeric_imputation_custom_value,
                        categorical_imputation=categorical_imputation if categorical_imputation != "Ввести свое значение" else categorical_imputation_custom_value,
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

if choice == "Экспорт":
    with open("data/best_model.pkl", "rb") as f:
        st.download_button("Download Model", f, file_name="data/best_model.pkl")
