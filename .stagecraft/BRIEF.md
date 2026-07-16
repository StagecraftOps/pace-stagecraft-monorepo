# StageCraft Remediation Brief -- StagecraftOps/pace-stagecraft-monorepo

## Findings (dependency-ordered, fix the first one first)

1. **apache-airflow** (critical) -- bump to `3.2.2` in `services/data/listing-etl/requirements.txt` -- closes #89
2. **apache-airflow** (critical) -- bump to `3.2.2` in `services/data/geo-data-pipeline/requirements.txt` -- closes #91
3. **apache-airflow** (critical) -- bump to `3.2.0` in `services/data/agent-performance-pipeline/requirements.txt` -- closes #58
4. **apache-airflow** (critical) -- bump to `2.11.1` in `services/data/climate-data-pipeline/requirements.txt` -- closes #77
5. **apache-airflow** (critical) -- bump to `2.10.1` in `services/data/hoa-data-pipeline/requirements.txt` -- closes #49
6. **pyarrow** (critical) -- bump to `23.0.1` in `services/data/ad-performance-pipeline/requirements.txt` -- closes #50
7. **apache-airflow** (critical) -- bump to `3.1.6, 2.11.1` in `services/data/dbt-models/requirements.txt` -- closes #51
8. **apache-airflow** (critical) -- bump to `2.9.3` in `services/data/census-data-pipeline/requirements.txt` -- closes #53
9. **apache-airflow** (high) -- bump to `3.2.2` in `services/data/data-science-notebook/requirements.txt` -- closes #87
10. **apache-airflow** (high) -- bump to `3.2.2` in `services/data/climate-data-pipeline/requirements.txt` -- closes #88
11. **apache-airflow** (high) -- bump to `3.2.2` in `services/data/flood-data-pipeline/requirements.txt` -- closes #95
12. **apache-airflow** (high) -- bump to `2.10.0` in `services/data/funnel-analysis-pipeline/requirements.txt` -- closes #54
13. **apache-airflow** (high) -- bump to `3.2.1rc1` in `services/data/agent-performance-pipeline/requirements.txt` -- closes #55
14. **apache-airflow** (high) -- bump to `2.11.1, 3.1.5rc1` in `services/data/data-quality-pipeline/requirements.txt` -- closes #56
15. **apache-airflow** (high) -- bump to `3.2.2` in `services/data/poi-data-pipeline/requirements.txt` -- closes #93
16. **apache-airflow** (high) -- bump to `3.2.2` in `services/data/walkscore-pipeline/requirements.txt` -- closes #92
17. **apache-airflow** (high) -- bump to `3.2.2` in `services/data/reporting-pipeline/requirements.txt` -- closes #98
18. **python-dotenv** (high) -- bump to `1.2.2` in `services/ml/nlp-description-service/requirements.txt` -- closes #61
19. **apache-airflow** (high) -- bump to `3.2.2` in `services/data/price-feed-pipeline/requirements.txt` -- closes #99
20. **apache-airflow** (high) -- bump to `2.9.3` in `services/data/tax-data-pipeline/requirements.txt` -- closes #48
21. **apache-airflow** (high) -- bump to `3.1.8` in `services/data/poi-data-pipeline/requirements.txt` -- closes #60
22. **apache-airflow** (high) -- bump to `2.11.1` in `services/data/data-science-notebook/requirements.txt` -- closes #66
23. **apache-airflow** (high) -- bump to `2.10.3` in `services/data/geo-data-pipeline/requirements.txt` -- closes #72
24. **apache-airflow** (high) -- bump to `3.1.7` in `services/data/climate-data-pipeline/requirements.txt` -- closes #62
25. **apache-airflow** (high) -- bump to `3.2.1rc1` in `services/data/tax-data-pipeline/requirements.txt` -- closes #69
26. **apache-airflow** (medium) -- bump to `2.9.2` in `services/data/climate-data-pipeline/requirements.txt` -- closes #52

Dependency order: apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> pyarrow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> python-dotenv -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow -> apache-airflow

## Application Context

- Risk tier: critical
- Regulatory scope: PCI, SOC2
- Data classification: PCI
