# StageCraft Remediation Brief -- StagecraftOps/pace-stagecraft-monorepo

## Findings (dependency-ordered, fix the first one first)

1. **apache-airflow** (critical) -- bump to `3.2.0` in `services/data/agent-performance-pipeline/requirements.txt` -- closes #58
2. **apache-airflow** (critical) -- bump to `2.11.1` in `services/data/climate-data-pipeline/requirements.txt` -- closes #77
3. **apache-airflow** (critical) -- bump to `2.10.1` in `services/data/hoa-data-pipeline/requirements.txt` -- closes #49
4. **pyarrow** (critical) -- bump to `23.0.1` in `services/data/ad-performance-pipeline/requirements.txt` -- closes #50
5. **apache-airflow** (critical) -- bump to `3.1.6, 2.11.1` in `services/data/dbt-models/requirements.txt` -- closes #51
6. **apache-airflow** (critical) -- bump to `2.9.3` in `services/data/census-data-pipeline/requirements.txt` -- closes #53
7. **apache-airflow** (high) -- bump to `2.10.0` in `services/data/funnel-analysis-pipeline/requirements.txt` -- closes #54
8. **apache-airflow** (high) -- bump to `3.2.1rc1` in `services/data/agent-performance-pipeline/requirements.txt` -- closes #55
9. **apache-airflow** (high) -- bump to `2.11.1, 3.1.5rc1` in `services/data/data-quality-pipeline/requirements.txt` -- closes #56
10. **python-dotenv** (high) -- bump to `1.2.2` in `services/ml/nlp-description-service/requirements.txt` -- closes #61
11. **apache-airflow** (high) -- bump to `2.9.3` in `services/data/tax-data-pipeline/requirements.txt` -- closes #48
12. **apache-airflow** (high) -- bump to `3.1.8` in `services/data/poi-data-pipeline/requirements.txt` -- closes #60
13. **apache-airflow** (high) -- bump to `2.11.1` in `services/data/data-science-notebook/requirements.txt` -- closes #66
14. **apache-airflow** (high) -- bump to `2.10.3` in `services/data/geo-data-pipeline/requirements.txt` -- closes #72
15. **apache-airflow** (high) -- bump to `3.1.7` in `services/data/climate-data-pipeline/requirements.txt` -- closes #62
16. **apache-airflow** (high) -- bump to `3.2.1rc1` in `services/data/tax-data-pipeline/requirements.txt` -- closes #69
17. **apache-airflow** (medium) -- bump to `2.9.2` in `services/data/climate-data-pipeline/requirements.txt` -- closes #52
18. **pyspark** (medium) -- bump to `3.4.4, 3.5.2` in `services/data/ad-performance-pipeline/requirements.txt` -- closes #63

Dependency order: apache-airflow -> apache-airflow -> apache-airflow -> pyarrow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> python-dotenv -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> pyspark

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: PCI
