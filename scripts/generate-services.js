/**
 * Zillow Monorepo - Service Generator Script
 * Generates all 300+ service scaffolds
 * Run: node scripts/generate-services.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// ─── Service Definitions ─────────────────────────────────────────────────────

const SERVICES = {
  // ── BACKEND: Node.js / Express / Fastify / NestJS ─────────────────────────
  backend: [
    { name: 'property-service',           lang: 'node',   framework: 'express',  desc: 'Core property listing CRUD operations' },
    { name: 'listing-service',            lang: 'node',   framework: 'express',  desc: 'MLS listing sync and management' },
    { name: 'search-api',                 lang: 'node',   framework: 'fastify',  desc: 'Property search orchestration API' },
    { name: 'user-service',               lang: 'node',   framework: 'nestjs',   desc: 'User profiles and preferences' },
    { name: 'agent-service',              lang: 'node',   framework: 'express',  desc: 'Real estate agent management' },
    { name: 'brokerage-service',          lang: 'node',   framework: 'express',  desc: 'Brokerage firm management' },
    { name: 'mls-sync-service',           lang: 'node',   framework: 'fastify',  desc: 'MLS data synchronization' },
    { name: 'zestimate-service',          lang: 'python', framework: 'fastapi',  desc: 'Zestimate AVM calculations' },
    { name: 'rent-zestimate-service',     lang: 'python', framework: 'fastapi',  desc: 'Rental estimate AVM' },
    { name: 'home-details-service',       lang: 'node',   framework: 'express',  desc: 'Detailed home information aggregation' },
    { name: 'comparable-sales-service',   lang: 'node',   framework: 'fastify',  desc: 'Comparable sales analysis' },
    { name: 'mortgage-service',           lang: 'node',   framework: 'nestjs',   desc: 'Mortgage calculator and rates' },
    { name: 'affordability-service',      lang: 'node',   framework: 'fastify',  desc: 'Home affordability calculator' },
    { name: 'tax-service',                lang: 'node',   framework: 'express',  desc: 'Property tax data and history' },
    { name: 'hoa-service',                lang: 'node',   framework: 'express',  desc: 'HOA information and fees' },
    { name: 'open-house-service',         lang: 'node',   framework: 'express',  desc: 'Open house scheduling' },
    { name: 'showing-service',            lang: 'node',   framework: 'fastify',  desc: 'Property showing requests' },
    { name: 'tour-service',               lang: 'node',   framework: 'nestjs',   desc: '3D tour management' },
    { name: 'offer-service',              lang: 'node',   framework: 'nestjs',   desc: 'Offer submission and tracking' },
    { name: 'contract-service',           lang: 'node',   framework: 'express',  desc: 'Purchase contract management' },
    { name: 'transaction-service',        lang: 'node',   framework: 'nestjs',   desc: 'Real estate transaction tracking' },
    { name: 'escrow-service',             lang: 'node',   framework: 'express',  desc: 'Escrow management' },
    { name: 'title-service',              lang: 'node',   framework: 'express',  desc: 'Title search and insurance' },
    { name: 'inspection-service',         lang: 'node',   framework: 'fastify',  desc: 'Home inspection management' },
    { name: 'appraisal-service',          lang: 'node',   framework: 'fastify',  desc: 'Property appraisal' },
    { name: 'lead-service',               lang: 'node',   framework: 'nestjs',   desc: 'Lead generation and tracking' },
    { name: 'lead-routing-service',       lang: 'node',   framework: 'fastify',  desc: 'Intelligent lead routing' },
    { name: 'crm-service',                lang: 'node',   framework: 'nestjs',   desc: 'CRM integration layer' },
    { name: 'review-service',             lang: 'node',   framework: 'express',  desc: 'Agent and property reviews' },
    { name: 'rating-service',             lang: 'node',   framework: 'fastify',  desc: 'Rating aggregation' },
    { name: 'favorite-service',           lang: 'node',   framework: 'express',  desc: 'Saved homes and favorites' },
    { name: 'saved-search-service',       lang: 'node',   framework: 'express',  desc: 'Saved search management' },
    { name: 'alert-service',              lang: 'node',   framework: 'fastify',  desc: 'Property alerts and notifications' },
    { name: 'feed-service',               lang: 'node',   framework: 'fastify',  desc: 'Personalized property feed' },
    { name: 'recommendation-service',     lang: 'python', framework: 'fastapi',  desc: 'ML-powered recommendations' },
    { name: 'personalization-service',    lang: 'python', framework: 'fastapi',  desc: 'User personalization engine' },
    { name: 'neighborhood-service',       lang: 'node',   framework: 'express',  desc: 'Neighborhood data and scores' },
    { name: 'school-service',             lang: 'node',   framework: 'express',  desc: 'School ratings and districts' },
    { name: 'crime-data-service',         lang: 'node',   framework: 'fastify',  desc: 'Crime statistics by area' },
    { name: 'commute-service',            lang: 'node',   framework: 'fastify',  desc: 'Commute time calculations' },
    { name: 'poi-service',                lang: 'node',   framework: 'express',  desc: 'Points of interest nearby' },
    { name: 'market-trends-service',      lang: 'node',   framework: 'fastify',  desc: 'Real estate market trends' },
    { name: 'price-history-service',      lang: 'node',   framework: 'express',  desc: 'Property price history' },
    { name: 'forecast-service',           lang: 'python', framework: 'fastapi',  desc: 'Price forecast models' },
    { name: 'inventory-service',          lang: 'node',   framework: 'fastify',  desc: 'Listing inventory tracking' },
    { name: 'days-on-market-service',     lang: 'node',   framework: 'express',  desc: 'Days on market analytics' },
    { name: 'photo-rank-service',         lang: 'python', framework: 'fastapi',  desc: 'AI photo ranking for listings' },
    { name: 'description-gen-service',    lang: 'python', framework: 'fastapi',  desc: 'AI listing description generator' },
    { name: 'floor-plan-service',         lang: 'python', framework: 'fastapi',  desc: 'Floor plan analysis and digitization' },
    { name: 'virtual-staging-service',    lang: 'python', framework: 'fastapi',  desc: 'AI virtual staging' },
    { name: 'document-service',           lang: 'node',   framework: 'express',  desc: 'Document storage and management' },
    { name: 'e-sign-service',             lang: 'node',   framework: 'nestjs',   desc: 'Electronic signature integration' },
    { name: 'compliance-service',         lang: 'node',   framework: 'express',  desc: 'Regulatory compliance checks' },
    { name: 'fair-housing-service',       lang: 'node',   framework: 'express',  desc: 'Fair housing compliance' },
    { name: 'listing-quality-service',    lang: 'node',   framework: 'fastify',  desc: 'Listing quality scoring' },
    { name: 'data-quality-service',       lang: 'node',   framework: 'fastify',  desc: 'Data quality validation' },
    { name: 'dedup-service',              lang: 'node',   framework: 'fastify',  desc: 'Listing deduplication' },
    { name: 'address-service',            lang: 'node',   framework: 'fastify',  desc: 'Address parsing and normalization' },
    { name: 'address-match-service',      lang: 'python', framework: 'fastapi',  desc: 'Fuzzy address matching' },
    { name: 'parcel-service',             lang: 'node',   framework: 'express',  desc: 'County parcel data' },
    { name: 'permit-service',             lang: 'node',   framework: 'express',  desc: 'Building permit data' },
    { name: 'flood-zone-service',         lang: 'node',   framework: 'express',  desc: 'FEMA flood zone data' },
    { name: 'climate-risk-service',       lang: 'python', framework: 'fastapi',  desc: 'Climate risk assessment' },
    { name: 'utility-service',            lang: 'node',   framework: 'express',  desc: 'Utility provider lookup' },
    { name: 'heatmap-service',            lang: 'python', framework: 'fastapi',  desc: 'Price heatmap generation' },
    { name: 'map-layer-service',          lang: 'node',   framework: 'express',  desc: 'Map overlay layers' },
    { name: 'polygon-service',            lang: 'node',   framework: 'fastify',  desc: 'Geographic polygon management' },
    { name: 'boundary-service',           lang: 'node',   framework: 'fastify',  desc: 'ZIP/city/county boundaries' },
    { name: 'geocoding-service',          lang: 'node',   framework: 'fastify',  desc: 'Address to lat/lng geocoding' },
    { name: 'reverse-geocoding-service',  lang: 'node',   framework: 'fastify',  desc: 'Lat/lng to address reverse geocoding' },
    { name: 'rental-service',             lang: 'node',   framework: 'nestjs',   desc: 'Rental listing management' },
    { name: 'rental-application-service', lang: 'node',   framework: 'nestjs',   desc: 'Rental application processing' },
    { name: 'tenant-service',             lang: 'node',   framework: 'express',  desc: 'Tenant management' },
    { name: 'lease-service',              lang: 'node',   framework: 'nestjs',   desc: 'Lease document management' },
    { name: 'background-check-service',   lang: 'node',   framework: 'express',  desc: 'Tenant background checks' },
    { name: 'credit-check-service',       lang: 'node',   framework: 'express',  desc: 'Credit score checks' },
    { name: 'income-verify-service',      lang: 'node',   framework: 'express',  desc: 'Income verification' },
    { name: 'maintenance-service',        lang: 'node',   framework: 'express',  desc: 'Property maintenance requests' },
    { name: 'landlord-service',           lang: 'node',   framework: 'express',  desc: 'Landlord portal management' },
    { name: 'property-mgmt-service',      lang: 'node',   framework: 'nestjs',   desc: 'Property management platform' },
    { name: 'construction-service',       lang: 'node',   framework: 'express',  desc: 'New construction tracking' },
    { name: 'builder-service',            lang: 'node',   framework: 'express',  desc: 'Home builder management' },
    { name: 'community-service',          lang: 'node',   framework: 'express',  desc: 'New community/development tracking' },
    { name: 'homeowner-service',          lang: 'node',   framework: 'nestjs',   desc: 'Homeowner dashboard backend' },
    { name: 'equity-service',             lang: 'node',   framework: 'fastify',  desc: 'Home equity calculations' },
    { name: 'refinance-service',          lang: 'node',   framework: 'fastify',  desc: 'Refinance rate comparisons' },
    { name: 'lender-service',             lang: 'node',   framework: 'nestjs',   desc: 'Lender directory and rates' },
    { name: 'loan-service',               lang: 'node',   framework: 'nestjs',   desc: 'Loan application management' },
    { name: 'pre-approval-service',       lang: 'node',   framework: 'express',  desc: 'Mortgage pre-approval' },
    { name: 'rate-engine-service',        lang: 'go',     framework: 'gin',      desc: 'Real-time mortgage rate engine' },
    { name: 'amortization-service',       lang: 'node',   framework: 'fastify',  desc: 'Loan amortization calculator' },
    { name: 'insurance-service',          lang: 'node',   framework: 'express',  desc: 'Home insurance quotes' },
    { name: 'warranty-service',           lang: 'node',   framework: 'express',  desc: 'Home warranty management' },
    { name: 'moving-service',             lang: 'node',   framework: 'express',  desc: 'Moving service marketplace' },
    { name: 'contractor-service',         lang: 'node',   framework: 'express',  desc: 'Contractor marketplace' },
    { name: 'home-improvement-service',   lang: 'node',   framework: 'express',  desc: 'Home improvement cost estimator' },
    { name: 'portfolio-service',          lang: 'node',   framework: 'nestjs',   desc: 'Investment portfolio tracking' },
    { name: 'cap-rate-service',           lang: 'python', framework: 'fastapi',  desc: 'Cap rate calculations' },
    { name: 'roi-service',                lang: 'python', framework: 'fastapi',  desc: 'Investment ROI analysis' },
    { name: 'config-service',             lang: 'node',   framework: 'fastify',  desc: 'Distributed configuration management' },
    { name: 'feature-flag-service',       lang: 'node',   framework: 'fastify',  desc: 'Feature flag management' },
    { name: 'ab-test-service',            lang: 'node',   framework: 'fastify',  desc: 'A/B test assignment' },
    { name: 'experiment-service',         lang: 'node',   framework: 'nestjs',   desc: 'Experimentation platform' },
    { name: 'audit-service',              lang: 'node',   framework: 'express',  desc: 'Audit log management' },
    { name: 'rate-limit-service',         lang: 'go',     framework: 'gin',      desc: 'API rate limiting' },
    { name: 'quota-service',              lang: 'go',     framework: 'gin',      desc: 'API quota management' },
    { name: 'health-check-service',       lang: 'go',     framework: 'gin',      desc: 'Service health monitoring' },
    { name: 'feedback-service',           lang: 'node',   framework: 'express',  desc: 'User feedback collection' },
    { name: 'report-service',             lang: 'node',   framework: 'nestjs',   desc: 'Listing report generation' },
    { name: 'listing-report-service',     lang: 'node',   framework: 'express',  desc: 'MLS compliance reports' },
    { name: 'content-service',            lang: 'node',   framework: 'nestjs',   desc: 'CMS content management' },
    { name: 'cms-api',                    lang: 'node',   framework: 'nestjs',   desc: 'Headless CMS API' },
    { name: 'blog-service',               lang: 'node',   framework: 'express',  desc: 'Blog and article management' },
    { name: 'seo-service',                lang: 'node',   framework: 'fastify',  desc: 'SEO metadata generation' },
    { name: 'sitemap-service',            lang: 'node',   framework: 'fastify',  desc: 'Dynamic sitemap generation' },
    { name: 'redirect-service',           lang: 'go',     framework: 'gin',      desc: 'URL redirect management' },
    { name: 'shortlink-service',          lang: 'go',     framework: 'gin',      desc: 'Short URL generation' },
    { name: 'share-service',              lang: 'node',   framework: 'express',  desc: 'Social sharing metadata' },
    { name: 'watchlist-service',          lang: 'node',   framework: 'express',  desc: 'Price drop watchlist' },
    { name: 'comparison-service',         lang: 'node',   framework: 'fastify',  desc: 'Side-by-side property comparison' },
    { name: 'listing-boost-service',      lang: 'node',   framework: 'express',  desc: 'Featured listing boost management' },
    { name: 'showcase-service',           lang: 'node',   framework: 'nestjs',   desc: 'Zillow Showcase management' },
    { name: 'premier-agent-service',      lang: 'node',   framework: 'nestjs',   desc: 'Premier Agent program management' },
    { name: 'advertising-service',        lang: 'node',   framework: 'nestjs',   desc: 'Ad inventory and targeting' },
    { name: 'ad-auction-service',         lang: 'go',     framework: 'gin',      desc: 'Real-time ad auction engine' },
  ],

  // ── FRONTEND ──────────────────────────────────────────────────────────────
  frontend: [
    { name: 'zillow-web',               lang: 'typescript', framework: 'nextjs',  desc: 'Main Zillow consumer web app' },
    { name: 'agent-portal',             lang: 'typescript', framework: 'react',   desc: 'Agent management dashboard' },
    { name: 'admin-dashboard',          lang: 'typescript', framework: 'nextjs',  desc: 'Internal admin panel' },
    { name: 'homeowner-hub',            lang: 'typescript', framework: 'nextjs',  desc: 'Homeowner dashboard' },
    { name: 'rental-portal',            lang: 'typescript', framework: 'nextjs',  desc: 'Rental listing portal' },
    { name: 'landlord-portal',          lang: 'typescript', framework: 'react',   desc: 'Landlord management app' },
    { name: 'lender-portal',            lang: 'typescript', framework: 'react',   desc: 'Mortgage lender dashboard' },
    { name: 'builder-portal',           lang: 'typescript', framework: 'react',   desc: 'New home builder portal' },
    { name: 'mobile-web',               lang: 'typescript', framework: 'nextjs',  desc: 'Mobile-optimized web app' },
    { name: 'listing-manager',          lang: 'typescript', framework: 'react',   desc: 'Listing creation and management UI' },
    { name: 'search-ui',                lang: 'typescript', framework: 'react',   desc: 'Advanced property search UI' },
    { name: 'map-explorer',             lang: 'typescript', framework: 'react',   desc: 'Interactive map-based search' },
    { name: 'property-detail-page',     lang: 'typescript', framework: 'nextjs',  desc: 'Property detail page (PDP)' },
    { name: 'mortgage-calculator-ui',   lang: 'typescript', framework: 'react',   desc: 'Mortgage calculator widgets' },
    { name: 'offer-flow',               lang: 'typescript', framework: 'react',   desc: 'Make-an-offer step flow' },
    { name: 'loan-application-ui',      lang: 'typescript', framework: 'nextjs',  desc: 'Mortgage application flow' },
    { name: 'tour-scheduler',           lang: 'typescript', framework: 'react',   desc: 'Property tour scheduler UI' },
    { name: 'virtual-tour-viewer',      lang: 'typescript', framework: 'react',   desc: '3D tour viewer (Three.js)' },
    { name: 'photo-gallery',            lang: 'typescript', framework: 'react',   desc: 'High-res photo gallery component' },
    { name: 'market-insights-ui',       lang: 'typescript', framework: 'nextjs',  desc: 'Market trends and data viz' },
    { name: 'neighborhood-explorer',    lang: 'typescript', framework: 'nextjs',  desc: 'Neighborhood info pages' },
    { name: 'school-finder',            lang: 'typescript', framework: 'react',   desc: 'School district explorer' },
    { name: 'zestimate-widget',         lang: 'typescript', framework: 'react',   desc: 'Zestimate display widgets' },
    { name: 'price-history-chart',      lang: 'typescript', framework: 'react',   desc: 'Price history visualization' },
    { name: 'comparable-homes',         lang: 'typescript', framework: 'react',   desc: 'Comparable homes component' },
    { name: 'home-worth',               lang: 'typescript', framework: 'nextjs',  desc: 'What\'s my home worth page' },
    { name: 'saved-homes-ui',           lang: 'typescript', framework: 'react',   desc: 'Saved homes and collections' },
    { name: 'alerts-ui',                lang: 'typescript', framework: 'react',   desc: 'Listing alert management' },
    { name: 'notification-center',      lang: 'typescript', framework: 'react',   desc: 'In-app notification center' },
    { name: 'profile-settings',         lang: 'typescript', framework: 'react',   desc: 'User profile and settings' },
    { name: 'onboarding-flow',          lang: 'typescript', framework: 'react',   desc: 'New user onboarding flow' },
    { name: 'marketing-site',           lang: 'typescript', framework: 'nextjs',  desc: 'Marketing and landing pages' },
    { name: 'blog-ui',                  lang: 'typescript', framework: 'nextjs',  desc: 'Blog and editorial content' },
    { name: 'help-center',              lang: 'typescript', framework: 'nextjs',  desc: 'Help and FAQ pages' },
    { name: 'component-library',        lang: 'typescript', framework: 'storybook', desc: 'Shared UI component library' },
    { name: 'design-system',            lang: 'typescript', framework: 'storybook', desc: 'Zillow design system tokens' },
    { name: 'icon-library',             lang: 'typescript', framework: 'react',   desc: 'SVG icon library' },
    { name: 'analytics-dashboard',      lang: 'typescript', framework: 'react',   desc: 'Business analytics dashboard' },
    { name: 'ops-console',              lang: 'typescript', framework: 'react',   desc: 'Operations console' },
    { name: 'agent-match-ui',           lang: 'typescript', framework: 'react',   desc: 'Agent matching and selection UI' },
    { name: 'premier-agent-ui',         lang: 'typescript', framework: 'react',   desc: 'Premier Agent profile pages' },
    { name: 'new-construction-ui',      lang: 'typescript', framework: 'nextjs',  desc: 'New construction homes portal' },
    { name: 'community-homes-ui',       lang: 'typescript', framework: 'nextjs',  desc: 'New community listings page' },
    { name: 'investment-tools-ui',      lang: 'typescript', framework: 'react',   desc: 'Real estate investment tools' },
    { name: 'equity-dashboard',         lang: 'typescript', framework: 'react',   desc: 'Home equity dashboard' },
    { name: 'refinance-ui',             lang: 'typescript', framework: 'nextjs',  desc: 'Refinance flow and calculator' },
    { name: 'insurance-marketplace-ui', lang: 'typescript', framework: 'nextjs',  desc: 'Home insurance marketplace' },
    { name: 'moving-checklist-ui',      lang: 'typescript', framework: 'react',   desc: 'Moving checklist and tools' },
    { name: 'property-report-ui',       lang: 'typescript', framework: 'react',   desc: 'Printable property reports' },
    { name: 'embed-widgets',            lang: 'typescript', framework: 'react',   desc: 'Embeddable listing widgets' },
  ],

  // ── DATA SERVICES ─────────────────────────────────────────────────────────
  data: [
    { name: 'mls-ingestion',            lang: 'python', framework: 'airflow',  desc: 'MLS data ingestion pipeline' },
    { name: 'property-etl',             lang: 'python', framework: 'spark',    desc: 'Property data ETL pipeline' },
    { name: 'listing-etl',              lang: 'python', framework: 'spark',    desc: 'Listing data transformation' },
    { name: 'user-events-pipeline',     lang: 'python', framework: 'flink',    desc: 'Real-time user event streaming' },
    { name: 'clickstream-pipeline',     lang: 'python', framework: 'flink',    desc: 'Clickstream analytics pipeline' },
    { name: 'search-events-pipeline',   lang: 'python', framework: 'kafka',    desc: 'Search event stream processing' },
    { name: 'price-feed-pipeline',      lang: 'python', framework: 'airflow',  desc: 'Property price feed ingestion' },
    { name: 'tax-data-pipeline',        lang: 'python', framework: 'spark',    desc: 'County tax record pipeline' },
    { name: 'permit-data-pipeline',     lang: 'python', framework: 'spark',    desc: 'Building permit data pipeline' },
    { name: 'school-data-pipeline',     lang: 'python', framework: 'airflow',  desc: 'School ratings data pipeline' },
    { name: 'census-data-pipeline',     lang: 'python', framework: 'spark',    desc: 'Census demographics pipeline' },
    { name: 'crime-data-pipeline',      lang: 'python', framework: 'airflow',  desc: 'Crime statistics ingestion' },
    { name: 'geo-data-pipeline',        lang: 'python', framework: 'spark',    desc: 'Geospatial data processing' },
    { name: 'poi-data-pipeline',        lang: 'python', framework: 'airflow',  desc: 'Points of interest ingestion' },
    { name: 'walkscore-pipeline',       lang: 'python', framework: 'airflow',  desc: 'Walk/transit/bike score pipeline' },
    { name: 'image-processing-pipeline',lang: 'python', framework: 'spark',    desc: 'Listing photo processing pipeline' },
    { name: 'avm-training-pipeline',    lang: 'python', framework: 'spark',    desc: 'AVM model training data pipeline' },
    { name: 'feature-store-pipeline',   lang: 'python', framework: 'spark',    desc: 'ML feature store ingestion' },
    { name: 'data-quality-pipeline',    lang: 'python', framework: 'airflow',  desc: 'Data quality validation pipeline' },
    { name: 'data-catalog-service',     lang: 'python', framework: 'fastapi',  desc: 'Data catalog and lineage' },
    { name: 'dbt-models',               lang: 'sql',    framework: 'dbt',      desc: 'dbt transformation models' },
    { name: 'data-warehouse-service',   lang: 'python', framework: 'fastapi',  desc: 'Data warehouse query layer' },
    { name: 'reporting-pipeline',       lang: 'python', framework: 'airflow',  desc: 'Business reporting pipeline' },
    { name: 'bi-pipeline',              lang: 'python', framework: 'airflow',  desc: 'BI data pipeline' },
    { name: 'realtime-aggregation',     lang: 'python', framework: 'flink',    desc: 'Real-time metric aggregation' },
    { name: 'cold-storage-archiver',    lang: 'python', framework: 'airflow',  desc: 'Cold storage archival pipeline' },
    { name: 'dedup-pipeline',           lang: 'python', framework: 'spark',    desc: 'Data deduplication pipeline' },
    { name: 'address-standardization',  lang: 'python', framework: 'spark',    desc: 'Address standardization pipeline' },
    { name: 'enrichment-pipeline',      lang: 'python', framework: 'spark',    desc: 'Property data enrichment' },
    { name: 'market-data-pipeline',     lang: 'python', framework: 'airflow',  desc: 'Market statistics pipeline' },
    { name: 'foreclosure-pipeline',     lang: 'python', framework: 'airflow',  desc: 'Foreclosure data ingestion' },
    { name: 'hoa-data-pipeline',        lang: 'python', framework: 'airflow',  desc: 'HOA data ingestion' },
    { name: 'flood-data-pipeline',      lang: 'python', framework: 'airflow',  desc: 'FEMA flood zone data pipeline' },
    { name: 'climate-data-pipeline',    lang: 'python', framework: 'spark',    desc: 'Climate risk data pipeline' },
    { name: 'agent-performance-pipeline', lang: 'python', framework: 'airflow', desc: 'Agent performance analytics' },
    { name: 'ad-performance-pipeline',  lang: 'python', framework: 'flink',    desc: 'Advertising performance pipeline' },
    { name: 'revenue-pipeline',         lang: 'python', framework: 'airflow',  desc: 'Revenue analytics pipeline' },
    { name: 'cohort-analysis-pipeline', lang: 'python', framework: 'spark',    desc: 'User cohort analysis pipeline' },
    { name: 'funnel-analysis-pipeline', lang: 'python', framework: 'spark',    desc: 'Conversion funnel pipeline' },
    { name: 'data-science-notebook',    lang: 'python', framework: 'jupyter',  desc: 'Data science exploration notebooks' },
  ],

  // ── ML SERVICES ───────────────────────────────────────────────────────────
  ml: [
    { name: 'zestimate-model',          lang: 'python', framework: 'fastapi',    desc: 'Zestimate AVM ML model service' },
    { name: 'rent-estimate-model',      lang: 'python', framework: 'fastapi',    desc: 'Rent Zestimate ML model service' },
    { name: 'price-forecast-model',     lang: 'python', framework: 'fastapi',    desc: 'Price forecast model service' },
    { name: 'listing-recommendation',   lang: 'python', framework: 'fastapi',    desc: 'Collaborative filtering recommendations' },
    { name: 'search-ranking-model',     lang: 'python', framework: 'fastapi',    desc: 'Search result ranking model' },
    { name: 'lead-scoring-model',       lang: 'python', framework: 'fastapi',    desc: 'Lead quality scoring model' },
    { name: 'churn-prediction-model',   lang: 'python', framework: 'fastapi',    desc: 'User churn prediction' },
    { name: 'fraud-detection-model',    lang: 'python', framework: 'fastapi',    desc: 'Listing fraud detection' },
    { name: 'image-classification',     lang: 'python', framework: 'fastapi',    desc: 'Property photo classification' },
    { name: 'object-detection-model',   lang: 'python', framework: 'fastapi',    desc: 'Object detection in home photos' },
    { name: 'nlp-description-service',  lang: 'python', framework: 'fastapi',    desc: 'NLP for listing description analysis' },
    { name: 'sentiment-analysis',       lang: 'python', framework: 'fastapi',    desc: 'Review sentiment analysis' },
    { name: 'similar-homes-model',      lang: 'python', framework: 'fastapi',    desc: 'Similar homes embedding model' },
    { name: 'days-on-market-model',     lang: 'python', framework: 'fastapi',    desc: 'Days on market prediction' },
    { name: 'offer-success-model',      lang: 'python', framework: 'fastapi',    desc: 'Offer success probability' },
    { name: 'model-registry-service',   lang: 'python', framework: 'fastapi',    desc: 'ML model registry and versioning' },
    { name: 'feature-store-service',    lang: 'python', framework: 'fastapi',    desc: 'ML feature store API' },
    { name: 'ab-test-analysis',         lang: 'python', framework: 'fastapi',    desc: 'A/B test statistical analysis' },
    { name: 'model-monitoring',         lang: 'python', framework: 'fastapi',    desc: 'ML model drift monitoring' },
    { name: 'training-orchestrator',    lang: 'python', framework: 'airflow',    desc: 'ML training job orchestration' },
    { name: 'inference-gateway',        lang: 'python', framework: 'fastapi',    desc: 'Unified ML inference gateway' },
    { name: 'embedding-service',        lang: 'python', framework: 'fastapi',    desc: 'Property and query embeddings' },
    { name: 'llm-service',              lang: 'python', framework: 'fastapi',    desc: 'LLM integration layer' },
    { name: 'vector-search-service',    lang: 'python', framework: 'fastapi',    desc: 'Semantic vector search' },
    { name: 'data-labeling-service',    lang: 'python', framework: 'fastapi',    desc: 'Training data labeling platform' },
  ],

  // ── AUTH SERVICES ─────────────────────────────────────────────────────────
  auth: [
    { name: 'auth-service',             lang: 'node',   framework: 'fastify',  desc: 'Core authentication service' },
    { name: 'oauth-service',            lang: 'node',   framework: 'fastify',  desc: 'OAuth 2.0 / OIDC provider' },
    { name: 'token-service',            lang: 'go',     framework: 'gin',      desc: 'JWT token management' },
    { name: 'session-service',          lang: 'go',     framework: 'gin',      desc: 'Distributed session management' },
    { name: 'mfa-service',              lang: 'node',   framework: 'express',  desc: 'Multi-factor authentication' },
    { name: 'sso-service',              lang: 'node',   framework: 'express',  desc: 'Single sign-on integration' },
    { name: 'permission-service',       lang: 'node',   framework: 'fastify',  desc: 'RBAC permission management' },
    { name: 'api-key-service',          lang: 'node',   framework: 'express',  desc: 'API key management' },
    { name: 'identity-service',         lang: 'node',   framework: 'nestjs',   desc: 'User identity management' },
    { name: 'password-service',         lang: 'node',   framework: 'fastify',  desc: 'Password reset and policies' },
    { name: 'social-login-service',     lang: 'node',   framework: 'express',  desc: 'Google/Apple/Facebook login' },
    { name: 'fraud-auth-service',       lang: 'node',   framework: 'fastify',  desc: 'Authentication fraud detection' },
    { name: 'captcha-service',          lang: 'node',   framework: 'express',  desc: 'CAPTCHA challenge service' },
    { name: 'bot-detection-service',    lang: 'go',     framework: 'gin',      desc: 'Bot detection and prevention' },
    { name: 'kyc-service',              lang: 'node',   framework: 'express',  desc: 'Know Your Customer verification' },
  ],

  // ── SEARCH SERVICES ───────────────────────────────────────────────────────
  search: [
    { name: 'elasticsearch-service',    lang: 'node',   framework: 'fastify',  desc: 'Elasticsearch index management' },
    { name: 'search-indexer',           lang: 'node',   framework: 'fastify',  desc: 'Property search indexing service' },
    { name: 'autocomplete-service',     lang: 'go',     framework: 'gin',      desc: 'Search autocomplete and suggestions' },
    { name: 'typeahead-service',        lang: 'go',     framework: 'gin',      desc: 'Fast typeahead search' },
    { name: 'facet-service',            lang: 'node',   framework: 'fastify',  desc: 'Search facet aggregation' },
    { name: 'query-builder-service',    lang: 'node',   framework: 'fastify',  desc: 'DSL query construction' },
    { name: 'search-analytics',         lang: 'node',   framework: 'express',  desc: 'Search performance analytics' },
    { name: 'spell-check-service',      lang: 'python', framework: 'fastapi',  desc: 'Search spelling correction' },
    { name: 'synonym-service',          lang: 'node',   framework: 'express',  desc: 'Search synonym management' },
    { name: 'semantic-search-service',  lang: 'python', framework: 'fastapi',  desc: 'Semantic/vector property search' },
    { name: 'saved-search-alerts',      lang: 'node',   framework: 'fastify',  desc: 'Saved search alert delivery' },
    { name: 'search-personalization',   lang: 'python', framework: 'fastapi',  desc: 'Personalized search ranking' },
    { name: 'geo-search-service',       lang: 'go',     framework: 'gin',      desc: 'Geospatial search queries' },
    { name: 'school-search-service',    lang: 'node',   framework: 'express',  desc: 'School-based property search' },
    { name: 'natural-language-search',  lang: 'python', framework: 'fastapi',  desc: 'Natural language search interface' },
  ],

  // ── MEDIA SERVICES ────────────────────────────────────────────────────────
  media: [
    { name: 'image-service',            lang: 'node',   framework: 'fastify',  desc: 'Image storage and delivery' },
    { name: 'image-resize-service',     lang: 'go',     framework: 'gin',      desc: 'On-the-fly image resizing' },
    { name: 'image-optimize-service',   lang: 'go',     framework: 'gin',      desc: 'Image compression and WebP conversion' },
    { name: 'photo-upload-service',     lang: 'node',   framework: 'fastify',  desc: 'Photo upload and validation' },
    { name: 'video-service',            lang: 'node',   framework: 'express',  desc: 'Video transcoding and delivery' },
    { name: 'video-upload-service',     lang: 'node',   framework: 'fastify',  desc: 'Video upload and processing' },
    { name: 'cdn-service',              lang: 'node',   framework: 'fastify',  desc: 'CDN cache management' },
    { name: 'watermark-service',        lang: 'go',     framework: 'gin',      desc: 'Photo watermarking' },
    { name: 'floor-plan-parser',        lang: 'python', framework: 'fastapi',  desc: 'Floor plan image parsing' },
    { name: 'virtual-tour-service',     lang: 'node',   framework: 'express',  desc: '3D virtual tour delivery' },
    { name: 'media-metadata-service',   lang: 'node',   framework: 'fastify',  desc: 'Photo/video EXIF metadata' },
    { name: 'thumbnail-service',        lang: 'go',     framework: 'gin',      desc: 'Thumbnail generation' },
    { name: 'streaming-service',        lang: 'node',   framework: 'fastify',  desc: 'Video streaming (HLS/DASH)' },
    { name: 'asset-storage-service',    lang: 'node',   framework: 'express',  desc: 'S3 asset storage management' },
    { name: 'photo-moderation-service', lang: 'python', framework: 'fastapi',  desc: 'AI photo content moderation' },
  ],

  // ── NOTIFICATION SERVICES ─────────────────────────────────────────────────
  notification: [
    { name: 'notification-service',     lang: 'node',   framework: 'nestjs',   desc: 'Core notification orchestration' },
    { name: 'email-service',            lang: 'node',   framework: 'fastify',  desc: 'Transactional email delivery' },
    { name: 'sms-service',              lang: 'node',   framework: 'fastify',  desc: 'SMS delivery via Twilio' },
    { name: 'push-notification-service',lang: 'node',   framework: 'fastify',  desc: 'iOS/Android push notifications' },
    { name: 'in-app-notification',      lang: 'node',   framework: 'fastify',  desc: 'In-app notification delivery' },
    { name: 'webhook-service',          lang: 'node',   framework: 'fastify',  desc: 'Outbound webhook management' },
    { name: 'notification-preferences', lang: 'node',   framework: 'express',  desc: 'Notification preference center' },
    { name: 'notification-template',    lang: 'node',   framework: 'express',  desc: 'Email/SMS template management' },
    { name: 'digest-service',           lang: 'node',   framework: 'fastify',  desc: 'Email digest generation' },
    { name: 'price-alert-service',      lang: 'node',   framework: 'fastify',  desc: 'Price drop alert delivery' },
    { name: 'new-listing-alert',        lang: 'node',   framework: 'fastify',  desc: 'New listing alert delivery' },
    { name: 'open-house-reminder',      lang: 'node',   framework: 'fastify',  desc: 'Open house reminder service' },
    { name: 'showing-reminder',         lang: 'node',   framework: 'fastify',  desc: 'Property showing reminders' },
    { name: 'unsubscribe-service',      lang: 'node',   framework: 'express',  desc: 'Unsubscribe and preference management' },
    { name: 'communication-history',    lang: 'node',   framework: 'express',  desc: 'Communication history log' },
  ],

  // ── ANALYTICS SERVICES ────────────────────────────────────────────────────
  analytics: [
    { name: 'event-tracking-service',   lang: 'go',     framework: 'gin',      desc: 'Client event tracking ingestion' },
    { name: 'metrics-service',          lang: 'go',     framework: 'gin',      desc: 'Business metrics API' },
    { name: 'reporting-service',        lang: 'node',   framework: 'nestjs',   desc: 'Business reporting engine' },
    { name: 'dashboard-service',        lang: 'node',   framework: 'nestjs',   desc: 'Analytics dashboard backend' },
    { name: 'funnel-service',           lang: 'node',   framework: 'fastify',  desc: 'Conversion funnel analytics' },
    { name: 'session-analytics',        lang: 'node',   framework: 'fastify',  desc: 'Session recording and replay' },
    { name: 'attribution-service',      lang: 'node',   framework: 'fastify',  desc: 'Marketing attribution' },
    { name: 'audience-service',         lang: 'node',   framework: 'nestjs',   desc: 'Audience segmentation' },
    { name: 'kpi-service',              lang: 'node',   framework: 'fastify',  desc: 'KPI tracking and alerting' },
    { name: 'cohort-service',           lang: 'python', framework: 'fastapi',  desc: 'Cohort retention analysis' },
    { name: 'revenue-analytics',        lang: 'node',   framework: 'nestjs',   desc: 'Revenue analytics service' },
    { name: 'ad-analytics-service',     lang: 'node',   framework: 'fastify',  desc: 'Ad campaign analytics' },
    { name: 'agent-analytics-service',  lang: 'node',   framework: 'express',  desc: 'Agent performance metrics' },
    { name: 'data-export-service',      lang: 'node',   framework: 'express',  desc: 'Analytics data export (CSV/JSON)' },
    { name: 'pixel-service',            lang: 'go',     framework: 'gin',      desc: 'Tracking pixel server' },
  ],

  // ── PAYMENT SERVICES ──────────────────────────────────────────────────────
  payment: [
    { name: 'payment-service',          lang: 'node',   framework: 'nestjs',   desc: 'Core payment processing' },
    { name: 'billing-service',          lang: 'node',   framework: 'nestjs',   desc: 'Subscription billing management' },
    { name: 'invoice-service',          lang: 'node',   framework: 'express',  desc: 'Invoice generation' },
    { name: 'stripe-service',           lang: 'node',   framework: 'fastify',  desc: 'Stripe payment integration' },
    { name: 'payout-service',           lang: 'node',   framework: 'fastify',  desc: 'Agent/partner payouts' },
    { name: 'refund-service',           lang: 'node',   framework: 'express',  desc: 'Refund processing' },
    { name: 'subscription-service',     lang: 'node',   framework: 'nestjs',   desc: 'Subscription management' },
    { name: 'promo-code-service',       lang: 'node',   framework: 'express',  desc: 'Promo code and discounts' },
    { name: 'revenue-recognition',      lang: 'node',   framework: 'express',  desc: 'Revenue recognition engine' },
    { name: 'tax-calculation-service',  lang: 'node',   framework: 'fastify',  desc: 'Sales tax calculation' },
  ],

  // ── GEO SERVICES ──────────────────────────────────────────────────────────
  geo: [
    { name: 'geocoder-service',         lang: 'go',     framework: 'gin',      desc: 'Address geocoding service' },
    { name: 'routing-service',          lang: 'go',     framework: 'gin',      desc: 'Driving/walking route calculation' },
    { name: 'isochrone-service',        lang: 'python', framework: 'fastapi',  desc: 'Commute isochrone generation' },
    { name: 'tile-server',              lang: 'node',   framework: 'fastify',  desc: 'Map tile serving (MVT)' },
    { name: 'gazetteer-service',        lang: 'node',   framework: 'express',  desc: 'Place name to boundary lookup' },
    { name: 'elevation-service',        lang: 'python', framework: 'fastapi',  desc: 'Terrain elevation data' },
    { name: 'timezone-service',         lang: 'go',     framework: 'gin',      desc: 'Timezone by coordinates' },
    { name: 'ip-geolocation-service',   lang: 'go',     framework: 'gin',      desc: 'IP address to location' },
    { name: 'area-stats-service',       lang: 'node',   framework: 'fastify',  desc: 'Statistics by geographic area' },
    { name: 'distance-service',         lang: 'go',     framework: 'gin',      desc: 'Distance and radius calculations' },
  ],

  // ── MESSAGING SERVICES ────────────────────────────────────────────────────
  messaging: [
    { name: 'kafka-producer-service',   lang: 'node',   framework: 'fastify',  desc: 'Kafka event producer' },
    { name: 'listing-events-consumer',  lang: 'node',   framework: 'kafka-js', desc: 'Listing change event consumer' },
    { name: 'user-events-consumer',     lang: 'node',   framework: 'kafka-js', desc: 'User event consumer' },
    { name: 'search-events-consumer',   lang: 'node',   framework: 'kafka-js', desc: 'Search event consumer' },
    { name: 'price-events-consumer',    lang: 'node',   framework: 'kafka-js', desc: 'Price change event consumer' },
    { name: 'notification-consumer',    lang: 'node',   framework: 'kafka-js', desc: 'Notification event consumer' },
    { name: 'analytics-consumer',       lang: 'node',   framework: 'kafka-js', desc: 'Analytics event consumer' },
    { name: 'payment-events-consumer',  lang: 'node',   framework: 'kafka-js', desc: 'Payment event consumer' },
    { name: 'lead-events-consumer',     lang: 'node',   framework: 'kafka-js', desc: 'Lead event consumer' },
    { name: 'dlq-processor',            lang: 'node',   framework: 'kafka-js', desc: 'Dead letter queue processor' },
    { name: 'event-bus-service',        lang: 'node',   framework: 'fastify',  desc: 'Internal event bus' },
    { name: 'message-router',           lang: 'go',     framework: 'gin',      desc: 'Cross-service message routing' },
    { name: 'sqs-consumer-service',     lang: 'node',   framework: 'fastify',  desc: 'AWS SQS consumer' },
    { name: 'sns-publisher-service',    lang: 'node',   framework: 'fastify',  desc: 'AWS SNS publisher' },
    { name: 'event-replay-service',     lang: 'node',   framework: 'fastify',  desc: 'Event replay and backfill' },
  ],

  // ── INFRA SERVICES ────────────────────────────────────────────────────────
  infra: [
    { name: 'api-gateway',              lang: 'go',     framework: 'gin',      desc: 'API gateway and routing' },
    { name: 'service-mesh-config',      lang: 'yaml',   framework: 'istio',    desc: 'Istio service mesh configuration' },
    { name: 'load-balancer-config',     lang: 'yaml',   framework: 'nginx',    desc: 'NGINX load balancer config' },
    { name: 'bff-web',                  lang: 'node',   framework: 'fastify',  desc: 'Backend-for-frontend (web)' },
    { name: 'bff-mobile',               lang: 'node',   framework: 'fastify',  desc: 'Backend-for-frontend (mobile)' },
    { name: 'graphql-gateway',          lang: 'node',   framework: 'apollo',   desc: 'Apollo GraphQL federation gateway' },
    { name: 'grpc-gateway',             lang: 'go',     framework: 'grpc',     desc: 'gRPC to HTTP transcoding gateway' },
    { name: 'cache-service',            lang: 'go',     framework: 'gin',      desc: 'Redis caching layer' },
    { name: 'circuit-breaker-service',  lang: 'go',     framework: 'gin',      desc: 'Circuit breaker pattern service' },
    { name: 'service-discovery',        lang: 'go',     framework: 'consul',   desc: 'Service discovery with Consul' },
  ],
};

// ─── Template Generators ─────────────────────────────────────────────────────

function nodeExpressTemplate(name, desc) {
  return {
    'package.json': JSON.stringify({
      name: `@zillow/${name}`,
      version: '1.0.0',
      description: desc,
      main: 'src/index.js',
      scripts: {
        start: 'node dist/index.js',
        dev: 'ts-node-dev --respawn src/index.ts',
        build: 'tsc',
        test: 'jest',
        lint: 'eslint src/**/*.ts',
      },
      dependencies: {
        express: '^4.18.3',
        'express-validator': '^7.0.1',
        cors: '^2.8.5',
        helmet: '^7.1.0',
        'morgan': '^1.10.0',
        dotenv: '^16.4.5',
        '@zillow/shared-types': '*',
        '@zillow/shared-utils': '*',
      },
      devDependencies: {
        typescript: '^5.4.5',
        '@types/express': '^4.17.21',
        '@types/node': '^20.12.7',
        'ts-node-dev': '^2.0.0',
        jest: '^29.7.0',
      },
    }, null, 2),

    'src/index.ts': `import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: '${name}' }));
app.use('/api/v1', router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(\`${name} running on port \${PORT}\`);
});

export default app;
`,

    'src/routes/index.ts': `import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({ service: '${name}', version: '1.0.0' });
});
`,

    'src/middleware/errorHandler.ts': `import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
`,

    'tsconfig.json': JSON.stringify({
      extends: '../../../../tsconfig.base.json',
      compilerOptions: { outDir: './dist', rootDir: './src' },
      include: ['src'],
    }, null, 2),

    'Dockerfile': `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
`,

    'README.md': `# ${name}\n\n${desc}\n\n## API\n\n\`GET /health\` — Health check\n\`GET /api/v1/\` — Service info\n`,
  };
}

function nodeFastifyTemplate(name, desc) {
  return {
    'package.json': JSON.stringify({
      name: `@zillow/${name}`,
      version: '1.0.0',
      description: desc,
      main: 'src/index.js',
      scripts: {
        start: 'node dist/index.js',
        dev: 'ts-node-dev --respawn src/index.ts',
        build: 'tsc',
        test: 'jest',
        lint: 'eslint src/**/*.ts',
      },
      dependencies: {
        fastify: '^4.26.2',
        '@fastify/cors': '^9.0.1',
        '@fastify/helmet': '^11.1.1',
        dotenv: '^16.4.5',
        '@zillow/shared-types': '*',
        '@zillow/shared-utils': '*',
      },
      devDependencies: {
        typescript: '^5.4.5',
        '@types/node': '^20.12.7',
        'ts-node-dev': '^2.0.0',
        jest: '^29.7.0',
      },
    }, null, 2),

    'src/index.ts': `import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

app.register(cors);
app.register(helmet);

app.get('/health', async () => ({ status: 'ok', service: '${name}' }));

app.get('/api/v1', async () => ({
  service: '${name}',
  version: '1.0.0',
  description: '${desc}',
}));

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) { app.log.error(err); process.exit(1); }
});

export default app;
`,

    'tsconfig.json': JSON.stringify({
      extends: '../../../../tsconfig.base.json',
      compilerOptions: { outDir: './dist', rootDir: './src' },
      include: ['src'],
    }, null, 2),

    'Dockerfile': `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/index.js"]
`,

    'README.md': `# ${name}\n\n${desc}\n`,
  };
}

function nestjsTemplate(name, desc) {
  return {
    'package.json': JSON.stringify({
      name: `@zillow/${name}`,
      version: '1.0.0',
      description: desc,
      scripts: {
        start: 'nest start',
        dev: 'nest start --watch',
        build: 'nest build',
        test: 'jest',
        lint: 'eslint src/**/*.ts',
      },
      dependencies: {
        '@nestjs/common': '^10.3.8',
        '@nestjs/core': '^10.3.8',
        '@nestjs/platform-fastify': '^10.3.8',
        '@nestjs/config': '^3.2.2',
        'reflect-metadata': '^0.2.2',
        rxjs: '^7.8.1',
        '@zillow/shared-types': '*',
        '@zillow/shared-utils': '*',
      },
      devDependencies: {
        '@nestjs/cli': '^10.3.2',
        '@types/node': '^20.12.7',
        typescript: '^5.4.5',
      },
    }, null, 2),

    'src/app.module.ts': `import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`,

    'src/app.controller.ts': `import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return { status: 'ok', service: '${name}' };
  }

  @Get()
  getInfo() {
    return this.appService.getInfo();
  }
}
`,

    'src/app.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return { service: '${name}', version: '1.0.0', description: '${desc}' };
  }
}
`,

    'src/main.ts': `import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log('${name} started on port', process.env.PORT || 3000);
}
bootstrap();
`,

    'tsconfig.json': JSON.stringify({
      extends: '../../../../tsconfig.base.json',
      compilerOptions: {
        outDir: './dist',
        rootDir: './src',
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
      },
      include: ['src'],
    }, null, 2),

    'Dockerfile': `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["node", "dist/main.js"]
`,

    'README.md': `# ${name}\n\n${desc}\n`,
  };
}

function fastapiTemplate(name, desc) {
  return {
    'main.py': `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import router
import os

app = FastAPI(title="${name}", description="${desc}", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1")

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "${name}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
`,

    'routers/__init__.py': ``,
    'routers/router.py': `from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_info():
    return {"service": "${name}", "version": "1.0.0", "description": "${desc}"}
`,

    'requirements.txt': `fastapi==0.110.2
uvicorn[standard]==0.29.0
pydantic==2.7.1
python-dotenv==1.0.1
httpx==0.27.0
`,

    'Dockerfile': `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
`,

    'README.md': `# ${name}\n\n${desc}\n\n## Run\n\n\`\`\`bash\nuvicorn main:app --reload\n\`\`\`\n`,
  };
}

function nextjsTemplate(name, desc) {
  return {
    'package.json': JSON.stringify({
      name: `@zillow/${name}`,
      version: '1.0.0',
      description: desc,
      scripts: {
        dev: 'next dev',
        build: 'next build',
        start: 'next start',
        lint: 'next lint',
        test: 'jest',
      },
      dependencies: {
        next: '^14.2.3',
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        '@zillow/shared-types': '*',
        '@zillow/shared-utils': '*',
      },
      devDependencies: {
        typescript: '^5.4.5',
        '@types/react': '^18.3.1',
        '@types/node': '^20.12.7',
        tailwindcss: '^3.4.3',
      },
    }, null, 2),

    'src/app/page.tsx': `export default function HomePage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">${name}</h1>
      <p className="text-gray-600 mt-2">${desc}</p>
    </main>
  );
}
`,

    'src/app/layout.tsx': `import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${name}',
  description: '${desc}',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`,

    'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@zillow/shared-types', '@zillow/shared-utils'],
};
module.exports = nextConfig;
`,

    'tsconfig.json': JSON.stringify({
      extends: '../../../../tsconfig.base.json',
      compilerOptions: {
        jsx: 'preserve',
        moduleResolution: 'bundler',
        plugins: [{ name: 'next' }],
      },
      include: ['src', 'next.config.js'],
    }, null, 2),

    'Dockerfile': `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
`,

    'README.md': `# ${name}\n\n${desc}\n`,
  };
}

function reactTemplate(name, desc) {
  return {
    'package.json': JSON.stringify({
      name: `@zillow/${name}`,
      version: '1.0.0',
      description: desc,
      scripts: {
        dev: 'vite',
        build: 'tsc && vite build',
        preview: 'vite preview',
        test: 'vitest',
        lint: 'eslint src',
      },
      dependencies: {
        react: '^18.3.1',
        'react-dom': '^18.3.1',
        'react-router-dom': '^6.23.1',
        '@zillow/shared-types': '*',
        '@zillow/shared-utils': '*',
      },
      devDependencies: {
        vite: '^5.2.11',
        '@vitejs/plugin-react': '^4.2.1',
        typescript: '^5.4.5',
        '@types/react': '^18.3.1',
        vitest: '^1.6.0',
      },
    }, null, 2),

    'src/App.tsx': `import React from 'react';

function App() {
  return (
    <div className="app">
      <h1>${name}</h1>
      <p>${desc}</p>
    </div>
  );
}

export default App;
`,

    'src/main.tsx': `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`,

    'index.html': `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,

    'vite.config.ts': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });
`,

    'tsconfig.json': JSON.stringify({
      extends: '../../../../tsconfig.base.json',
      compilerOptions: { jsx: 'react-jsx', moduleResolution: 'bundler' },
      include: ['src'],
    }, null, 2),

    'README.md': `# ${name}\n\n${desc}\n`,
  };
}

function goTemplate(name, desc) {
  const modName = name.replace(/-/g, '_');
  return {
    'main.go': `package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "service": "${name}"})
	})

	r.GET("/api/v1", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"service":     "${name}",
			"version":     "1.0.0",
			"description": "${desc}",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("${name} running on port %s\\n", port)
	r.Run(":" + port)
}

var _ = fmt.Sprintf // prevent unused import
`,

    'go.mod': `module github.com/zillow/${modName}

go 1.22

require (
	github.com/gin-gonic/gin v1.9.1
)
`,

    'Dockerfile': `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE 8080
CMD ["./server"]
`,

    'README.md': `# ${name}\n\n${desc}\n`,
  };
}

function pythonPipelineTemplate(name, desc, framework) {
  return {
    'pipeline.py': `"""
${name} - ${desc}
Framework: ${framework}
"""

import os
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class ${name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}:
    """${desc}"""

    def __init__(self):
        self.name = "${name}"
        self.version = "1.0.0"

    def run(self):
        logger.info(f"Starting {self.name} at {datetime.utcnow().isoformat()}")
        try:
            self.extract()
            self.transform()
            self.load()
            logger.info(f"{self.name} completed successfully")
        except Exception as e:
            logger.error(f"{self.name} failed: {e}")
            raise

    def extract(self):
        logger.info("Extracting data...")

    def transform(self):
        logger.info("Transforming data...")

    def load(self):
        logger.info("Loading data...")


if __name__ == "__main__":
    pipeline = ${name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('')}()
    pipeline.run()
`,

    'requirements.txt': `apache-airflow==2.9.1
pyspark==3.5.1
pandas==2.2.2
pyarrow==16.0.0
boto3==1.34.89
python-dotenv==1.0.1
`,

    'README.md': `# ${name}\n\n${desc}\n\n## Framework: ${framework}\n`,
  };
}

// ─── File Writer ─────────────────────────────────────────────────────────────

function writeFiles(dir, files) {
  fs.mkdirSync(dir, { recursive: true });
  for (const [filename, content] of Object.entries(files)) {
    const filePath = path.join(dir, filename);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

function getTemplate(service, category) {
  const { name, lang, framework, desc } = service;
  if (lang === 'node') {
    if (framework === 'express') return nodeExpressTemplate(name, desc);
    if (framework === 'fastify') return nodeFastifyTemplate(name, desc);
    if (framework === 'nestjs') return nestjsTemplate(name, desc);
    if (framework === 'kafka-js') return nodeFastifyTemplate(name, desc);
    if (framework === 'apollo') return nodeFastifyTemplate(name, desc);
    return nodeExpressTemplate(name, desc);
  }
  if (lang === 'typescript') {
    if (framework === 'nextjs') return nextjsTemplate(name, desc);
    if (framework === 'storybook') return reactTemplate(name, desc);
    return reactTemplate(name, desc);
  }
  if (lang === 'python') {
    if (framework === 'fastapi') return fastapiTemplate(name, desc);
    return pythonPipelineTemplate(name, desc, framework);
  }
  if (lang === 'go') return goTemplate(name, desc);
  // Default: simple node express
  return nodeExpressTemplate(name, desc);
}

// ─── Main Generation ─────────────────────────────────────────────────────────

let totalGenerated = 0;

for (const [category, services] of Object.entries(SERVICES)) {
  console.log(`\n📁 Generating ${category} services (${services.length})...`);
  for (const service of services) {
    const serviceDir = path.join(ROOT, 'services', category, service.name);
    const files = getTemplate(service, category);
    writeFiles(serviceDir, files);
    totalGenerated++;
    process.stdout.write(`  ✅ [${totalGenerated}] ${service.name}\n`);
  }
}

// ─── Generate service registry ───────────────────────────────────────────────

const registry = Object.entries(SERVICES).flatMap(([category, services]) =>
  services.map((s) => ({
    name: s.name,
    category,
    language: s.lang,
    framework: s.framework,
    description: s.desc,
    path: `services/${category}/${s.name}`,
    port: null,
  }))
);

fs.writeFileSync(
  path.join(ROOT, 'service-registry.json'),
  JSON.stringify({ generatedAt: new Date().toISOString(), totalServices: registry.length, services: registry }, null, 2),
  'utf8'
);

console.log(`\n🎉 Done! Generated ${totalGenerated} services.`);
console.log(`📋 Service registry written to service-registry.json`);
