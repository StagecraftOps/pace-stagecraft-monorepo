# ============================================================
# Zillow Monorepo - PowerShell Service Generator
# Generates all 300+ service scaffolds without Node.js
# Usage: .\scripts\generate-all-services.ps1
# ============================================================

param(
    [string]$Root = (Split-Path $PSScriptRoot -Parent)
)

$ErrorActionPreference = "Stop"
$totalCreated = 0

function Write-ServiceFile($dir, $filename, $content) {
    $fullPath = Join-Path $dir $filename
    $parentDir = Split-Path $fullPath -Parent
    if (-not (Test-Path $parentDir)) { New-Item -ItemType Directory -Path $parentDir -Force | Out-Null }
    Set-Content -Path $fullPath -Value $content -Encoding UTF8
}

function New-NodeExpressService($dir, $name, $desc) {
    $pkg = @"
{
  "name": "@zillow/$name",
  "version": "1.0.0",
  "description": "$desc",
  "main": "src/index.js",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  },
  "dependencies": {
    "express": "^4.18.3",
    "cors": "^2.8.5",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.4.5",
    "@zillow/shared-types": "*",
    "@zillow/shared-utils": "*"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "@types/express": "^4.17.21",
    "@types/node": "^20.12.7",
    "ts-node-dev": "^2.0.0",
    "jest": "^29.7.0"
  }
}
"@
    $index = @"
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: '$name' }));
app.get('/api/v1', (_req, res) => res.json({ service: '$name', version: '1.0.0', description: '$desc' }));

app.listen(PORT, () => console.log(`$name running on port `+PORT));
export default app;
"@
    $tsconfig = '{"extends":"../../../../tsconfig.base.json","compilerOptions":{"outDir":"./dist","rootDir":"./src"},"include":["src"]}'
    $dockerfile = "FROM node:20-alpine`nWORKDIR /app`nCOPY package*.json ./`nRUN npm ci --only=production`nCOPY dist ./dist`nEXPOSE 3000`nCMD [""node"",""dist/index.js""]"
    $readme = "# $name`n`n$desc`n"
    Write-ServiceFile $dir "package.json" $pkg
    Write-ServiceFile $dir "src/index.ts" $index
    Write-ServiceFile $dir "tsconfig.json" $tsconfig
    Write-ServiceFile $dir "Dockerfile" $dockerfile
    Write-ServiceFile $dir "README.md" $readme
}

function New-NodeFastifyService($dir, $name, $desc) {
    $pkg = @"
{
  "name": "@zillow/$name",
  "version": "1.0.0",
  "description": "$desc",
  "scripts": {
    "start": "node dist/index.js",
    "dev": "ts-node-dev --respawn src/index.ts",
    "build": "tsc",
    "test": "jest"
  },
  "dependencies": {
    "fastify": "^4.26.2",
    "@fastify/cors": "^9.0.1",
    "@fastify/helmet": "^11.1.1",
    "dotenv": "^16.4.5",
    "@zillow/shared-types": "*",
    "@zillow/shared-utils": "*"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "@types/node": "^20.12.7",
    "ts-node-dev": "^2.0.0"
  }
}
"@
    $index = @"
import Fastify from 'fastify';
const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

app.get('/health', async () => ({ status: 'ok', service: '$name' }));
app.get('/api/v1', async () => ({ service: '$name', version: '1.0.0', description: '$desc' }));

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) { app.log.error(err); process.exit(1); }
});
export default app;
"@
    $tsconfig = '{"extends":"../../../../tsconfig.base.json","compilerOptions":{"outDir":"./dist","rootDir":"./src"},"include":["src"]}'
    $dockerfile = "FROM node:20-alpine`nWORKDIR /app`nCOPY package*.json ./`nRUN npm ci --only=production`nCOPY dist ./dist`nEXPOSE 3000`nCMD [""node"",""dist/index.js""]"
    Write-ServiceFile $dir "package.json" $pkg
    Write-ServiceFile $dir "src/index.ts" $index
    Write-ServiceFile $dir "tsconfig.json" $tsconfig
    Write-ServiceFile $dir "Dockerfile" $dockerfile
    Write-ServiceFile $dir "README.md" "# $name`n`n$desc`n"
}

function New-NestJsService($dir, $name, $desc) {
    $pkg = @"
{
  "name": "@zillow/$name",
  "version": "1.0.0",
  "description": "$desc",
  "scripts": {
    "start": "nest start",
    "dev": "nest start --watch",
    "build": "nest build",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.8",
    "@nestjs/core": "^10.3.8",
    "@nestjs/platform-fastify": "^10.3.8",
    "@nestjs/config": "^3.2.2",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "@zillow/shared-types": "*",
    "@zillow/shared-utils": "*"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.2",
    "typescript": "^5.4.5",
    "@types/node": "^20.12.7"
  }
}
"@
    $mainTs = @"
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
"@
    $appModule = @"
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({ controllers: [AppController], providers: [AppService] })
export class AppModule {}
"@
    $appController = @"
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() { return { status: 'ok', service: '$name' }; }
}
"@
    $appService = @"
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() { return { service: '$name', version: '1.0.0', description: '$desc' }; }
}
"@
    $tsconfig = '{"extends":"../../../../tsconfig.base.json","compilerOptions":{"outDir":"./dist","rootDir":"./src","emitDecoratorMetadata":true,"experimentalDecorators":true},"include":["src"]}'
    Write-ServiceFile $dir "package.json" $pkg
    Write-ServiceFile $dir "src/main.ts" $mainTs
    Write-ServiceFile $dir "src/app.module.ts" $appModule
    Write-ServiceFile $dir "src/app.controller.ts" $appController
    Write-ServiceFile $dir "src/app.service.ts" $appService
    Write-ServiceFile $dir "tsconfig.json" $tsconfig
    Write-ServiceFile $dir "README.md" "# $name`n`n$desc`n"
}

function New-FastApiService($dir, $name, $desc) {
    $mainPy = @"
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="$name", description="$desc", version="1.0.0")

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
def health(): return {"status": "ok", "service": "$name"}

@app.get("/api/v1")
def info(): return {"service": "$name", "version": "1.0.0", "description": "$desc"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
"@
    $requirements = "fastapi==0.110.2`nuvicorn[standard]==0.29.0`npydantic==2.7.1`npython-dotenv==1.0.1`nhttpx==0.27.0"
    $dockerfile = "FROM python:3.12-slim`nWORKDIR /app`nCOPY requirements.txt .`nRUN pip install --no-cache-dir -r requirements.txt`nCOPY . .`nEXPOSE 8000`nCMD [""uvicorn"",""main:app"",""--host"",""0.0.0.0"",""--port"",""8000""]"
    Write-ServiceFile $dir "main.py" $mainPy
    Write-ServiceFile $dir "requirements.txt" $requirements
    Write-ServiceFile $dir "Dockerfile" $dockerfile
    Write-ServiceFile $dir "README.md" "# $name`n`n$desc`n"
}

function New-NextJsService($dir, $name, $desc) {
    $pkg = @"
{
  "name": "@zillow/$name",
  "version": "1.0.0",
  "description": "$desc",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@zillow/shared-types": "*",
    "@zillow/shared-utils": "*"
  },
  "devDependencies": {
    "typescript": "^5.4.5",
    "@types/react": "^18.3.1",
    "@types/node": "^20.12.7",
    "tailwindcss": "^3.4.3"
  }
}
"@
    $page = @"
export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>$name</h1>
      <p>$desc</p>
    </main>
  );
}
"@
    $layout = @"
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
"@
    $tsconfig = '{"extends":"../../../../tsconfig.base.json","compilerOptions":{"jsx":"preserve","moduleResolution":"bundler"},"include":["src","next.config.js"]}'
    $nextConfig = "/** @type {import('next').NextConfig} */`nconst nextConfig = {};`nmodule.exports = nextConfig;"
    Write-ServiceFile $dir "package.json" $pkg
    Write-ServiceFile $dir "src/app/page.tsx" $page
    Write-ServiceFile $dir "src/app/layout.tsx" $layout
    Write-ServiceFile $dir "tsconfig.json" $tsconfig
    Write-ServiceFile $dir "next.config.js" $nextConfig
    Write-ServiceFile $dir "README.md" "# $name`n`n$desc`n"
}

function New-ReactService($dir, $name, $desc) {
    $pkg = @"
{
  "name": "@zillow/$name",
  "version": "1.0.0",
  "description": "$desc",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "@zillow/shared-types": "*",
    "@zillow/shared-utils": "*"
  },
  "devDependencies": {
    "vite": "^5.2.11",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.4.5",
    "@types/react": "^18.3.1",
    "vitest": "^1.6.0"
  }
}
"@
    $app = @"
import React from 'react';
function App() {
  return (<div><h1>$name</h1><p>$desc</p></div>);
}
export default App;
"@
    $main = @"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
"@
    $html = "<!DOCTYPE html><html lang=`"en`"><head><meta charset=`"UTF-8`" /><title>$name</title></head><body><div id=`"root`"></div><script type=`"module`" src=`"/src/main.tsx`"></script></body></html>"
    $viteConfig = "import { defineConfig } from 'vite';`nimport react from '@vitejs/plugin-react';`nexport default defineConfig({ plugins: [react()] });"
    $tsconfig = '{"extends":"../../../../tsconfig.base.json","compilerOptions":{"jsx":"react-jsx","moduleResolution":"bundler"},"include":["src"]}'
    Write-ServiceFile $dir "package.json" $pkg
    Write-ServiceFile $dir "src/App.tsx" $app
    Write-ServiceFile $dir "src/main.tsx" $main
    Write-ServiceFile $dir "index.html" $html
    Write-ServiceFile $dir "vite.config.ts" $viteConfig
    Write-ServiceFile $dir "tsconfig.json" $tsconfig
    Write-ServiceFile $dir "README.md" "# $name`n`n$desc`n"
}

function New-GoService($dir, $name, $desc) {
    $modName = $name -replace '-','_'
    $mainGo = @"
package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok", "service": "$name"})
	})
	r.GET("/api/v1", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"service": "$name", "version": "1.0.0", "description": "$desc"})
	})
	port := os.Getenv("PORT")
	if port == "" { port = "8080" }
	fmt.Printf("$name running on port %s\n", port)
	r.Run(":" + port)
}
"@
    $goMod = "module github.com/zillow/$modName`n`ngo 1.22`n`nrequire (`n`tgithub.com/gin-gonic/gin v1.9.1`n)`n"
    $dockerfile = "FROM golang:1.22-alpine AS builder`nWORKDIR /app`nCOPY go.mod go.sum ./`nRUN go mod download`nCOPY . .`nRUN CGO_ENABLED=0 GOOS=linux go build -o server .`n`nFROM alpine:3.19`nWORKDIR /app`nCOPY --from=builder /app/server .`nEXPOSE 8080`nCMD [""./server""]"
    Write-ServiceFile $dir "main.go" $mainGo
    Write-ServiceFile $dir "go.mod" $goMod
    Write-ServiceFile $dir "Dockerfile" $dockerfile
    Write-ServiceFile $dir "README.md" "# $name`n`n$desc`n"
}

function New-PythonPipelineService($dir, $name, $desc, $framework) {
    $className = ($name -split '-' | ForEach-Object { $_.Substring(0,1).ToUpper() + $_.Substring(1) }) -join ''
    $lines = @(
        "# $name - $desc",
        "# Framework: $framework",
        "import logging",
        "from datetime import datetime",
        "",
        "logging.basicConfig(level=logging.INFO)",
        "logger = logging.getLogger(__name__)",
        "",
        "",
        "class ${className}:",
        "    '''$desc'''",
        "    def __init__(self):",
        "        self.name = '$name'",
        "        self.version = '1.0.0'",
        "",
        "    def run(self):",
        "        logger.info('Starting ' + self.name)",
        "        self.extract()",
        "        self.transform()",
        "        self.load()",
        "        logger.info(self.name + ' completed')",
        "",
        "    def extract(self):",
        "        logger.info('Extracting data...')",
        "",
        "    def transform(self):",
        "        logger.info('Transforming data...')",
        "",
        "    def load(self):",
        "        logger.info('Loading data...')",
        "",
        "",
        "if __name__ == '__main__':",
        "    pipeline = ${className}()",
        "    pipeline.run()"
    )
    $pipeline = $lines -join "`n"
    $requirements = "apache-airflow==2.9.1`npyspark==3.5.1`npandas==2.2.2`npyarrow==16.0.0`nboto3==1.34.89`npython-dotenv==1.0.1"
    Write-ServiceFile $dir "pipeline.py" $pipeline
    Write-ServiceFile $dir "requirements.txt" $requirements
    Write-ServiceFile $dir "README.md" "# $name`n`n$desc`n`n## Framework: $framework`n"
}

function New-Service($category, $name, $lang, $framework, $desc) {
    $dir = Join-Path (Join-Path (Join-Path $Root "services") $category) $name
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }

    switch ($lang) {
        "node" {
            switch ($framework) {
                "express"  { New-NodeExpressService $dir $name $desc }
                "fastify"  { New-NodeFastifyService $dir $name $desc }
                "nestjs"   { New-NestJsService $dir $name $desc }
                default    { New-NodeExpressService $dir $name $desc }
            }
        }
        "typescript" {
            switch ($framework) {
                "nextjs"    { New-NextJsService $dir $name $desc }
                "storybook" { New-ReactService $dir $name $desc }
                default     { New-ReactService $dir $name $desc }
            }
        }
        "python" {
            switch ($framework) {
                "fastapi" { New-FastApiService $dir $name $desc }
                default   { New-PythonPipelineService $dir $name $desc $framework }
            }
        }
        "go" { New-GoService $dir $name $desc }
        default { New-NodeExpressService $dir $name $desc }
    }

    $script:totalCreated++
    Write-Host "  [OK] [$($script:totalCreated)] $name ($lang/$framework)" -ForegroundColor Green
}

# ============================================================
# SERVICE DEFINITIONS
# ============================================================

Write-Host "`n=== BACKEND SERVICES ===" -ForegroundColor Cyan
$backendServices = @(
    @{n="property-service";l="node";f="express";d="Core property listing CRUD operations"},
    @{n="listing-service";l="node";f="express";d="MLS listing sync and management"},
    @{n="search-api";l="node";f="fastify";d="Property search orchestration API"},
    @{n="user-service";l="node";f="nestjs";d="User profiles and preferences"},
    @{n="agent-service";l="node";f="express";d="Real estate agent management"},
    @{n="brokerage-service";l="node";f="express";d="Brokerage firm management"},
    @{n="mls-sync-service";l="node";f="fastify";d="MLS data synchronization"},
    @{n="zestimate-service";l="python";f="fastapi";d="Zestimate AVM calculations"},
    @{n="rent-zestimate-service";l="python";f="fastapi";d="Rental estimate AVM"},
    @{n="home-details-service";l="node";f="express";d="Detailed home information aggregation"},
    @{n="comparable-sales-service";l="node";f="fastify";d="Comparable sales analysis"},
    @{n="mortgage-service";l="node";f="nestjs";d="Mortgage calculator and rates"},
    @{n="affordability-service";l="node";f="fastify";d="Home affordability calculator"},
    @{n="tax-service";l="node";f="express";d="Property tax data and history"},
    @{n="hoa-service";l="node";f="express";d="HOA information and fees"},
    @{n="open-house-service";l="node";f="express";d="Open house scheduling"},
    @{n="showing-service";l="node";f="fastify";d="Property showing requests"},
    @{n="tour-service";l="node";f="nestjs";d="3D tour management"},
    @{n="offer-service";l="node";f="nestjs";d="Offer submission and tracking"},
    @{n="contract-service";l="node";f="express";d="Purchase contract management"},
    @{n="transaction-service";l="node";f="nestjs";d="Real estate transaction tracking"},
    @{n="escrow-service";l="node";f="express";d="Escrow management"},
    @{n="title-service";l="node";f="express";d="Title search and insurance"},
    @{n="inspection-service";l="node";f="fastify";d="Home inspection management"},
    @{n="appraisal-service";l="node";f="fastify";d="Property appraisal"},
    @{n="lead-service";l="node";f="nestjs";d="Lead generation and tracking"},
    @{n="lead-routing-service";l="node";f="fastify";d="Intelligent lead routing"},
    @{n="crm-service";l="node";f="nestjs";d="CRM integration layer"},
    @{n="review-service";l="node";f="express";d="Agent and property reviews"},
    @{n="rating-service";l="node";f="fastify";d="Rating aggregation"},
    @{n="favorite-service";l="node";f="express";d="Saved homes and favorites"},
    @{n="saved-search-service";l="node";f="express";d="Saved search management"},
    @{n="alert-service";l="node";f="fastify";d="Property alerts and notifications"},
    @{n="feed-service";l="node";f="fastify";d="Personalized property feed"},
    @{n="recommendation-service";l="python";f="fastapi";d="ML-powered recommendations"},
    @{n="personalization-service";l="python";f="fastapi";d="User personalization engine"},
    @{n="neighborhood-service";l="node";f="express";d="Neighborhood data and scores"},
    @{n="school-service";l="node";f="express";d="School ratings and districts"},
    @{n="crime-data-service";l="node";f="fastify";d="Crime statistics by area"},
    @{n="commute-service";l="node";f="fastify";d="Commute time calculations"},
    @{n="poi-service";l="node";f="express";d="Points of interest nearby"},
    @{n="market-trends-service";l="node";f="fastify";d="Real estate market trends"},
    @{n="price-history-service";l="node";f="express";d="Property price history"},
    @{n="forecast-service";l="python";f="fastapi";d="Price forecast models"},
    @{n="inventory-service";l="node";f="fastify";d="Listing inventory tracking"},
    @{n="days-on-market-service";l="node";f="express";d="Days on market analytics"},
    @{n="photo-rank-service";l="python";f="fastapi";d="AI photo ranking for listings"},
    @{n="description-gen-service";l="python";f="fastapi";d="AI listing description generator"},
    @{n="floor-plan-service";l="python";f="fastapi";d="Floor plan analysis and digitization"},
    @{n="virtual-staging-service";l="python";f="fastapi";d="AI virtual staging"},
    @{n="document-service";l="node";f="express";d="Document storage and management"},
    @{n="e-sign-service";l="node";f="nestjs";d="Electronic signature integration"},
    @{n="compliance-service";l="node";f="express";d="Regulatory compliance checks"},
    @{n="fair-housing-service";l="node";f="express";d="Fair housing compliance"},
    @{n="listing-quality-service";l="node";f="fastify";d="Listing quality scoring"},
    @{n="data-quality-service";l="node";f="fastify";d="Data quality validation"},
    @{n="dedup-service";l="node";f="fastify";d="Listing deduplication"},
    @{n="address-service";l="node";f="fastify";d="Address parsing and normalization"},
    @{n="address-match-service";l="python";f="fastapi";d="Fuzzy address matching"},
    @{n="parcel-service";l="node";f="express";d="County parcel data"},
    @{n="permit-service";l="node";f="express";d="Building permit data"},
    @{n="flood-zone-service";l="node";f="express";d="FEMA flood zone data"},
    @{n="climate-risk-service";l="python";f="fastapi";d="Climate risk assessment"},
    @{n="utility-service";l="node";f="express";d="Utility provider lookup"},
    @{n="heatmap-service";l="python";f="fastapi";d="Price heatmap generation"},
    @{n="map-layer-service";l="node";f="express";d="Map overlay layers"},
    @{n="polygon-service";l="node";f="fastify";d="Geographic polygon management"},
    @{n="boundary-service";l="node";f="fastify";d="ZIP/city/county boundaries"},
    @{n="geocoding-service";l="node";f="fastify";d="Address to lat/lng geocoding"},
    @{n="reverse-geocoding-service";l="node";f="fastify";d="Lat/lng to address reverse geocoding"},
    @{n="rental-service";l="node";f="nestjs";d="Rental listing management"},
    @{n="rental-application-service";l="node";f="nestjs";d="Rental application processing"},
    @{n="tenant-service";l="node";f="express";d="Tenant management"},
    @{n="lease-service";l="node";f="nestjs";d="Lease document management"},
    @{n="background-check-service";l="node";f="express";d="Tenant background checks"},
    @{n="credit-check-service";l="node";f="express";d="Credit score checks"},
    @{n="income-verify-service";l="node";f="express";d="Income verification"},
    @{n="maintenance-service";l="node";f="express";d="Property maintenance requests"},
    @{n="landlord-service";l="node";f="express";d="Landlord portal management"},
    @{n="property-mgmt-service";l="node";f="nestjs";d="Property management platform"},
    @{n="construction-service";l="node";f="express";d="New construction tracking"},
    @{n="builder-service";l="node";f="express";d="Home builder management"},
    @{n="community-service";l="node";f="express";d="New community/development tracking"},
    @{n="homeowner-service";l="node";f="nestjs";d="Homeowner dashboard backend"},
    @{n="equity-service";l="node";f="fastify";d="Home equity calculations"},
    @{n="refinance-service";l="node";f="fastify";d="Refinance rate comparisons"},
    @{n="lender-service";l="node";f="nestjs";d="Lender directory and rates"},
    @{n="loan-service";l="node";f="nestjs";d="Loan application management"},
    @{n="pre-approval-service";l="node";f="express";d="Mortgage pre-approval"},
    @{n="rate-engine-service";l="go";f="gin";d="Real-time mortgage rate engine"},
    @{n="amortization-service";l="node";f="fastify";d="Loan amortization calculator"},
    @{n="insurance-service";l="node";f="express";d="Home insurance quotes"},
    @{n="warranty-service";l="node";f="express";d="Home warranty management"},
    @{n="moving-service";l="node";f="express";d="Moving service marketplace"},
    @{n="contractor-service";l="node";f="express";d="Contractor marketplace"},
    @{n="home-improvement-service";l="node";f="express";d="Home improvement cost estimator"},
    @{n="portfolio-service";l="node";f="nestjs";d="Investment portfolio tracking"},
    @{n="cap-rate-service";l="python";f="fastapi";d="Cap rate calculations"},
    @{n="roi-service";l="python";f="fastapi";d="Investment ROI analysis"},
    @{n="config-service";l="node";f="fastify";d="Distributed configuration management"},
    @{n="feature-flag-service";l="node";f="fastify";d="Feature flag management"},
    @{n="ab-test-service";l="node";f="fastify";d="A/B test assignment"},
    @{n="experiment-service";l="node";f="nestjs";d="Experimentation platform"},
    @{n="audit-service";l="node";f="express";d="Audit log management"},
    @{n="rate-limit-service";l="go";f="gin";d="API rate limiting"},
    @{n="quota-service";l="go";f="gin";d="API quota management"},
    @{n="health-check-service";l="go";f="gin";d="Service health monitoring"},
    @{n="feedback-service";l="node";f="express";d="User feedback collection"},
    @{n="report-service";l="node";f="nestjs";d="Listing report generation"},
    @{n="listing-report-service";l="node";f="express";d="MLS compliance reports"},
    @{n="content-service";l="node";f="nestjs";d="CMS content management"},
    @{n="cms-api";l="node";f="nestjs";d="Headless CMS API"},
    @{n="blog-service";l="node";f="express";d="Blog and article management"},
    @{n="seo-service";l="node";f="fastify";d="SEO metadata generation"},
    @{n="sitemap-service";l="node";f="fastify";d="Dynamic sitemap generation"},
    @{n="redirect-service";l="go";f="gin";d="URL redirect management"},
    @{n="shortlink-service";l="go";f="gin";d="Short URL generation"},
    @{n="share-service";l="node";f="express";d="Social sharing metadata"},
    @{n="watchlist-service";l="node";f="express";d="Price drop watchlist"},
    @{n="comparison-service";l="node";f="fastify";d="Side-by-side property comparison"},
    @{n="listing-boost-service";l="node";f="express";d="Featured listing boost management"},
    @{n="showcase-service";l="node";f="nestjs";d="Zillow Showcase management"},
    @{n="premier-agent-service";l="node";f="nestjs";d="Premier Agent program management"},
    @{n="advertising-service";l="node";f="nestjs";d="Ad inventory and targeting"},
    @{n="ad-auction-service";l="go";f="gin";d="Real-time ad auction engine"}
)
foreach ($s in $backendServices) { New-Service "backend" $s.n $s.l $s.f $s.d }

Write-Host "`n=== FRONTEND SERVICES ===" -ForegroundColor Cyan
$frontendServices = @(
    @{n="zillow-web";l="typescript";f="nextjs";d="Main Zillow consumer web app"},
    @{n="agent-portal";l="typescript";f="react";d="Agent management dashboard"},
    @{n="admin-dashboard";l="typescript";f="nextjs";d="Internal admin panel"},
    @{n="homeowner-hub";l="typescript";f="nextjs";d="Homeowner dashboard"},
    @{n="rental-portal";l="typescript";f="nextjs";d="Rental listing portal"},
    @{n="landlord-portal";l="typescript";f="react";d="Landlord management app"},
    @{n="lender-portal";l="typescript";f="react";d="Mortgage lender dashboard"},
    @{n="builder-portal";l="typescript";f="react";d="New home builder portal"},
    @{n="mobile-web";l="typescript";f="nextjs";d="Mobile-optimized web app"},
    @{n="listing-manager";l="typescript";f="react";d="Listing creation and management UI"},
    @{n="search-ui";l="typescript";f="react";d="Advanced property search UI"},
    @{n="map-explorer";l="typescript";f="react";d="Interactive map-based search"},
    @{n="property-detail-page";l="typescript";f="nextjs";d="Property detail page (PDP)"},
    @{n="mortgage-calculator-ui";l="typescript";f="react";d="Mortgage calculator widgets"},
    @{n="offer-flow";l="typescript";f="react";d="Make-an-offer step flow"},
    @{n="loan-application-ui";l="typescript";f="nextjs";d="Mortgage application flow"},
    @{n="tour-scheduler";l="typescript";f="react";d="Property tour scheduler UI"},
    @{n="virtual-tour-viewer";l="typescript";f="react";d="3D tour viewer"},
    @{n="photo-gallery";l="typescript";f="react";d="High-res photo gallery component"},
    @{n="market-insights-ui";l="typescript";f="nextjs";d="Market trends and data viz"},
    @{n="neighborhood-explorer";l="typescript";f="nextjs";d="Neighborhood info pages"},
    @{n="school-finder";l="typescript";f="react";d="School district explorer"},
    @{n="zestimate-widget";l="typescript";f="react";d="Zestimate display widgets"},
    @{n="price-history-chart";l="typescript";f="react";d="Price history visualization"},
    @{n="comparable-homes";l="typescript";f="react";d="Comparable homes component"},
    @{n="home-worth";l="typescript";f="nextjs";d="What is my home worth page"},
    @{n="saved-homes-ui";l="typescript";f="react";d="Saved homes and collections"},
    @{n="alerts-ui";l="typescript";f="react";d="Listing alert management"},
    @{n="notification-center";l="typescript";f="react";d="In-app notification center"},
    @{n="profile-settings";l="typescript";f="react";d="User profile and settings"},
    @{n="onboarding-flow";l="typescript";f="react";d="New user onboarding flow"},
    @{n="marketing-site";l="typescript";f="nextjs";d="Marketing and landing pages"},
    @{n="blog-ui";l="typescript";f="nextjs";d="Blog and editorial content"},
    @{n="help-center";l="typescript";f="nextjs";d="Help and FAQ pages"},
    @{n="component-library";l="typescript";f="storybook";d="Shared UI component library"},
    @{n="design-system";l="typescript";f="storybook";d="Zillow design system tokens"},
    @{n="icon-library";l="typescript";f="react";d="SVG icon library"},
    @{n="analytics-dashboard";l="typescript";f="react";d="Business analytics dashboard"},
    @{n="ops-console";l="typescript";f="react";d="Operations console"},
    @{n="agent-match-ui";l="typescript";f="react";d="Agent matching and selection UI"},
    @{n="premier-agent-ui";l="typescript";f="react";d="Premier Agent profile pages"},
    @{n="new-construction-ui";l="typescript";f="nextjs";d="New construction homes portal"},
    @{n="community-homes-ui";l="typescript";f="nextjs";d="New community listings page"},
    @{n="investment-tools-ui";l="typescript";f="react";d="Real estate investment tools"},
    @{n="equity-dashboard";l="typescript";f="react";d="Home equity dashboard"},
    @{n="refinance-ui";l="typescript";f="nextjs";d="Refinance flow and calculator"},
    @{n="insurance-marketplace-ui";l="typescript";f="nextjs";d="Home insurance marketplace"},
    @{n="moving-checklist-ui";l="typescript";f="react";d="Moving checklist and tools"},
    @{n="property-report-ui";l="typescript";f="react";d="Printable property reports"},
    @{n="embed-widgets";l="typescript";f="react";d="Embeddable listing widgets"}
)
foreach ($s in $frontendServices) { New-Service "frontend" $s.n $s.l $s.f $s.d }

Write-Host "`n=== DATA SERVICES ===" -ForegroundColor Cyan
$dataServices = @(
    @{n="mls-ingestion";l="python";f="airflow";d="MLS data ingestion pipeline"},
    @{n="property-etl";l="python";f="spark";d="Property data ETL pipeline"},
    @{n="listing-etl";l="python";f="spark";d="Listing data transformation"},
    @{n="user-events-pipeline";l="python";f="flink";d="Real-time user event streaming"},
    @{n="clickstream-pipeline";l="python";f="flink";d="Clickstream analytics pipeline"},
    @{n="search-events-pipeline";l="python";f="kafka";d="Search event stream processing"},
    @{n="price-feed-pipeline";l="python";f="airflow";d="Property price feed ingestion"},
    @{n="tax-data-pipeline";l="python";f="spark";d="County tax record pipeline"},
    @{n="permit-data-pipeline";l="python";f="spark";d="Building permit data pipeline"},
    @{n="school-data-pipeline";l="python";f="airflow";d="School ratings data pipeline"},
    @{n="census-data-pipeline";l="python";f="spark";d="Census demographics pipeline"},
    @{n="crime-data-pipeline";l="python";f="airflow";d="Crime statistics ingestion"},
    @{n="geo-data-pipeline";l="python";f="spark";d="Geospatial data processing"},
    @{n="poi-data-pipeline";l="python";f="airflow";d="Points of interest ingestion"},
    @{n="walkscore-pipeline";l="python";f="airflow";d="Walk transit bike score pipeline"},
    @{n="image-processing-pipeline";l="python";f="spark";d="Listing photo processing pipeline"},
    @{n="avm-training-pipeline";l="python";f="spark";d="AVM model training data pipeline"},
    @{n="feature-store-pipeline";l="python";f="spark";d="ML feature store ingestion"},
    @{n="data-quality-pipeline";l="python";f="airflow";d="Data quality validation pipeline"},
    @{n="data-catalog-service";l="python";f="fastapi";d="Data catalog and lineage"},
    @{n="dbt-models";l="python";f="dbt";d="dbt transformation models"},
    @{n="data-warehouse-service";l="python";f="fastapi";d="Data warehouse query layer"},
    @{n="reporting-pipeline";l="python";f="airflow";d="Business reporting pipeline"},
    @{n="bi-pipeline";l="python";f="airflow";d="BI data pipeline"},
    @{n="realtime-aggregation";l="python";f="flink";d="Real-time metric aggregation"},
    @{n="cold-storage-archiver";l="python";f="airflow";d="Cold storage archival pipeline"},
    @{n="dedup-pipeline";l="python";f="spark";d="Data deduplication pipeline"},
    @{n="address-standardization";l="python";f="spark";d="Address standardization pipeline"},
    @{n="enrichment-pipeline";l="python";f="spark";d="Property data enrichment"},
    @{n="market-data-pipeline";l="python";f="airflow";d="Market statistics pipeline"},
    @{n="foreclosure-pipeline";l="python";f="airflow";d="Foreclosure data ingestion"},
    @{n="hoa-data-pipeline";l="python";f="airflow";d="HOA data ingestion"},
    @{n="flood-data-pipeline";l="python";f="airflow";d="FEMA flood zone data pipeline"},
    @{n="climate-data-pipeline";l="python";f="spark";d="Climate risk data pipeline"},
    @{n="agent-performance-pipeline";l="python";f="airflow";d="Agent performance analytics"},
    @{n="ad-performance-pipeline";l="python";f="flink";d="Advertising performance pipeline"},
    @{n="revenue-pipeline";l="python";f="airflow";d="Revenue analytics pipeline"},
    @{n="cohort-analysis-pipeline";l="python";f="spark";d="User cohort analysis pipeline"},
    @{n="funnel-analysis-pipeline";l="python";f="spark";d="Conversion funnel pipeline"},
    @{n="data-science-notebook";l="python";f="jupyter";d="Data science exploration notebooks"}
)
foreach ($s in $dataServices) { New-Service "data" $s.n $s.l $s.f $s.d }

Write-Host "`n=== ML SERVICES ===" -ForegroundColor Cyan
$mlServices = @(
    @{n="zestimate-model";l="python";f="fastapi";d="Zestimate AVM ML model service"},
    @{n="rent-estimate-model";l="python";f="fastapi";d="Rent Zestimate ML model service"},
    @{n="price-forecast-model";l="python";f="fastapi";d="Price forecast model service"},
    @{n="listing-recommendation";l="python";f="fastapi";d="Collaborative filtering recommendations"},
    @{n="search-ranking-model";l="python";f="fastapi";d="Search result ranking model"},
    @{n="lead-scoring-model";l="python";f="fastapi";d="Lead quality scoring model"},
    @{n="churn-prediction-model";l="python";f="fastapi";d="User churn prediction"},
    @{n="fraud-detection-model";l="python";f="fastapi";d="Listing fraud detection"},
    @{n="image-classification";l="python";f="fastapi";d="Property photo classification"},
    @{n="object-detection-model";l="python";f="fastapi";d="Object detection in home photos"},
    @{n="nlp-description-service";l="python";f="fastapi";d="NLP for listing description analysis"},
    @{n="sentiment-analysis";l="python";f="fastapi";d="Review sentiment analysis"},
    @{n="similar-homes-model";l="python";f="fastapi";d="Similar homes embedding model"},
    @{n="days-on-market-model";l="python";f="fastapi";d="Days on market prediction"},
    @{n="offer-success-model";l="python";f="fastapi";d="Offer success probability"},
    @{n="model-registry-service";l="python";f="fastapi";d="ML model registry and versioning"},
    @{n="feature-store-service";l="python";f="fastapi";d="ML feature store API"},
    @{n="ab-test-analysis";l="python";f="fastapi";d="AB test statistical analysis"},
    @{n="model-monitoring";l="python";f="fastapi";d="ML model drift monitoring"},
    @{n="training-orchestrator";l="python";f="airflow";d="ML training job orchestration"},
    @{n="inference-gateway";l="python";f="fastapi";d="Unified ML inference gateway"},
    @{n="embedding-service";l="python";f="fastapi";d="Property and query embeddings"},
    @{n="llm-service";l="python";f="fastapi";d="LLM integration layer"},
    @{n="vector-search-service";l="python";f="fastapi";d="Semantic vector search"},
    @{n="data-labeling-service";l="python";f="fastapi";d="Training data labeling platform"}
)
foreach ($s in $mlServices) { New-Service "ml" $s.n $s.l $s.f $s.d }

Write-Host "`n=== AUTH SERVICES ===" -ForegroundColor Cyan
$authServices = @(
    @{n="auth-service";l="node";f="fastify";d="Core authentication service"},
    @{n="oauth-service";l="node";f="fastify";d="OAuth 2.0 / OIDC provider"},
    @{n="token-service";l="go";f="gin";d="JWT token management"},
    @{n="session-service";l="go";f="gin";d="Distributed session management"},
    @{n="mfa-service";l="node";f="express";d="Multi-factor authentication"},
    @{n="sso-service";l="node";f="express";d="Single sign-on integration"},
    @{n="permission-service";l="node";f="fastify";d="RBAC permission management"},
    @{n="api-key-service";l="node";f="express";d="API key management"},
    @{n="identity-service";l="node";f="nestjs";d="User identity management"},
    @{n="password-service";l="node";f="fastify";d="Password reset and policies"},
    @{n="social-login-service";l="node";f="express";d="Google Apple Facebook login"},
    @{n="fraud-auth-service";l="node";f="fastify";d="Authentication fraud detection"},
    @{n="captcha-service";l="node";f="express";d="CAPTCHA challenge service"},
    @{n="bot-detection-service";l="go";f="gin";d="Bot detection and prevention"},
    @{n="kyc-service";l="node";f="express";d="Know Your Customer verification"}
)
foreach ($s in $authServices) { New-Service "auth" $s.n $s.l $s.f $s.d }

Write-Host "`n=== SEARCH SERVICES ===" -ForegroundColor Cyan
$searchServices = @(
    @{n="elasticsearch-service";l="node";f="fastify";d="Elasticsearch index management"},
    @{n="search-indexer";l="node";f="fastify";d="Property search indexing service"},
    @{n="autocomplete-service";l="go";f="gin";d="Search autocomplete and suggestions"},
    @{n="typeahead-service";l="go";f="gin";d="Fast typeahead search"},
    @{n="facet-service";l="node";f="fastify";d="Search facet aggregation"},
    @{n="query-builder-service";l="node";f="fastify";d="DSL query construction"},
    @{n="search-analytics";l="node";f="express";d="Search performance analytics"},
    @{n="spell-check-service";l="python";f="fastapi";d="Search spelling correction"},
    @{n="synonym-service";l="node";f="express";d="Search synonym management"},
    @{n="semantic-search-service";l="python";f="fastapi";d="Semantic vector property search"},
    @{n="saved-search-alerts";l="node";f="fastify";d="Saved search alert delivery"},
    @{n="search-personalization";l="python";f="fastapi";d="Personalized search ranking"},
    @{n="geo-search-service";l="go";f="gin";d="Geospatial search queries"},
    @{n="school-search-service";l="node";f="express";d="School-based property search"},
    @{n="natural-language-search";l="python";f="fastapi";d="Natural language search interface"}
)
foreach ($s in $searchServices) { New-Service "search" $s.n $s.l $s.f $s.d }

Write-Host "`n=== MEDIA SERVICES ===" -ForegroundColor Cyan
$mediaServices = @(
    @{n="image-service";l="node";f="fastify";d="Image storage and delivery"},
    @{n="image-resize-service";l="go";f="gin";d="On-the-fly image resizing"},
    @{n="image-optimize-service";l="go";f="gin";d="Image compression and WebP conversion"},
    @{n="photo-upload-service";l="node";f="fastify";d="Photo upload and validation"},
    @{n="video-service";l="node";f="express";d="Video transcoding and delivery"},
    @{n="video-upload-service";l="node";f="fastify";d="Video upload and processing"},
    @{n="cdn-service";l="node";f="fastify";d="CDN cache management"},
    @{n="watermark-service";l="go";f="gin";d="Photo watermarking"},
    @{n="floor-plan-parser";l="python";f="fastapi";d="Floor plan image parsing"},
    @{n="virtual-tour-service";l="node";f="express";d="3D virtual tour delivery"},
    @{n="media-metadata-service";l="node";f="fastify";d="Photo/video EXIF metadata"},
    @{n="thumbnail-service";l="go";f="gin";d="Thumbnail generation"},
    @{n="streaming-service";l="node";f="fastify";d="Video streaming HLS DASH"},
    @{n="asset-storage-service";l="node";f="express";d="S3 asset storage management"},
    @{n="photo-moderation-service";l="python";f="fastapi";d="AI photo content moderation"}
)
foreach ($s in $mediaServices) { New-Service "media" $s.n $s.l $s.f $s.d }

Write-Host "`n=== NOTIFICATION SERVICES ===" -ForegroundColor Cyan
$notificationServices = @(
    @{n="notification-service";l="node";f="nestjs";d="Core notification orchestration"},
    @{n="email-service";l="node";f="fastify";d="Transactional email delivery"},
    @{n="sms-service";l="node";f="fastify";d="SMS delivery via Twilio"},
    @{n="push-notification-service";l="node";f="fastify";d="iOS/Android push notifications"},
    @{n="in-app-notification";l="node";f="fastify";d="In-app notification delivery"},
    @{n="webhook-service";l="node";f="fastify";d="Outbound webhook management"},
    @{n="notification-preferences";l="node";f="express";d="Notification preference center"},
    @{n="notification-template";l="node";f="express";d="Email/SMS template management"},
    @{n="digest-service";l="node";f="fastify";d="Email digest generation"},
    @{n="price-alert-service";l="node";f="fastify";d="Price drop alert delivery"},
    @{n="new-listing-alert";l="node";f="fastify";d="New listing alert delivery"},
    @{n="open-house-reminder";l="node";f="fastify";d="Open house reminder service"},
    @{n="showing-reminder";l="node";f="fastify";d="Property showing reminders"},
    @{n="unsubscribe-service";l="node";f="express";d="Unsubscribe and preference management"},
    @{n="communication-history";l="node";f="express";d="Communication history log"}
)
foreach ($s in $notificationServices) { New-Service "notification" $s.n $s.l $s.f $s.d }

Write-Host "`n=== ANALYTICS SERVICES ===" -ForegroundColor Cyan
$analyticsServices = @(
    @{n="event-tracking-service";l="go";f="gin";d="Client event tracking ingestion"},
    @{n="metrics-service";l="go";f="gin";d="Business metrics API"},
    @{n="reporting-service";l="node";f="nestjs";d="Business reporting engine"},
    @{n="dashboard-service";l="node";f="nestjs";d="Analytics dashboard backend"},
    @{n="funnel-service";l="node";f="fastify";d="Conversion funnel analytics"},
    @{n="session-analytics";l="node";f="fastify";d="Session recording and replay"},
    @{n="attribution-service";l="node";f="fastify";d="Marketing attribution"},
    @{n="audience-service";l="node";f="nestjs";d="Audience segmentation"},
    @{n="kpi-service";l="node";f="fastify";d="KPI tracking and alerting"},
    @{n="cohort-service";l="python";f="fastapi";d="Cohort retention analysis"},
    @{n="revenue-analytics";l="node";f="nestjs";d="Revenue analytics service"},
    @{n="ad-analytics-service";l="node";f="fastify";d="Ad campaign analytics"},
    @{n="agent-analytics-service";l="node";f="express";d="Agent performance metrics"},
    @{n="data-export-service";l="node";f="express";d="Analytics data export CSV JSON"},
    @{n="pixel-service";l="go";f="gin";d="Tracking pixel server"}
)
foreach ($s in $analyticsServices) { New-Service "analytics" $s.n $s.l $s.f $s.d }

Write-Host "`n=== PAYMENT SERVICES ===" -ForegroundColor Cyan
$paymentServices = @(
    @{n="payment-service";l="node";f="nestjs";d="Core payment processing"},
    @{n="billing-service";l="node";f="nestjs";d="Subscription billing management"},
    @{n="invoice-service";l="node";f="express";d="Invoice generation"},
    @{n="stripe-service";l="node";f="fastify";d="Stripe payment integration"},
    @{n="payout-service";l="node";f="fastify";d="Agent partner payouts"},
    @{n="refund-service";l="node";f="express";d="Refund processing"},
    @{n="subscription-service";l="node";f="nestjs";d="Subscription management"},
    @{n="promo-code-service";l="node";f="express";d="Promo code and discounts"},
    @{n="revenue-recognition";l="node";f="express";d="Revenue recognition engine"},
    @{n="tax-calculation-service";l="node";f="fastify";d="Sales tax calculation"}
)
foreach ($s in $paymentServices) { New-Service "payment" $s.n $s.l $s.f $s.d }

Write-Host "`n=== GEO SERVICES ===" -ForegroundColor Cyan
$geoServices = @(
    @{n="geocoder-service";l="go";f="gin";d="Address geocoding service"},
    @{n="routing-service";l="go";f="gin";d="Driving/walking route calculation"},
    @{n="isochrone-service";l="python";f="fastapi";d="Commute isochrone generation"},
    @{n="tile-server";l="node";f="fastify";d="Map tile serving MVT"},
    @{n="gazetteer-service";l="node";f="express";d="Place name to boundary lookup"},
    @{n="elevation-service";l="python";f="fastapi";d="Terrain elevation data"},
    @{n="timezone-service";l="go";f="gin";d="Timezone by coordinates"},
    @{n="ip-geolocation-service";l="go";f="gin";d="IP address to location"},
    @{n="area-stats-service";l="node";f="fastify";d="Statistics by geographic area"},
    @{n="distance-service";l="go";f="gin";d="Distance and radius calculations"}
)
foreach ($s in $geoServices) { New-Service "geo" $s.n $s.l $s.f $s.d }

Write-Host "`n=== MESSAGING SERVICES ===" -ForegroundColor Cyan
$messagingServices = @(
    @{n="kafka-producer-service";l="node";f="fastify";d="Kafka event producer"},
    @{n="listing-events-consumer";l="node";f="fastify";d="Listing change event consumer"},
    @{n="user-events-consumer";l="node";f="fastify";d="User event consumer"},
    @{n="search-events-consumer";l="node";f="fastify";d="Search event consumer"},
    @{n="price-events-consumer";l="node";f="fastify";d="Price change event consumer"},
    @{n="notification-consumer";l="node";f="fastify";d="Notification event consumer"},
    @{n="analytics-consumer";l="node";f="fastify";d="Analytics event consumer"},
    @{n="payment-events-consumer";l="node";f="fastify";d="Payment event consumer"},
    @{n="lead-events-consumer";l="node";f="fastify";d="Lead event consumer"},
    @{n="dlq-processor";l="node";f="fastify";d="Dead letter queue processor"},
    @{n="event-bus-service";l="node";f="fastify";d="Internal event bus"},
    @{n="message-router";l="go";f="gin";d="Cross-service message routing"},
    @{n="sqs-consumer-service";l="node";f="fastify";d="AWS SQS consumer"},
    @{n="sns-publisher-service";l="node";f="fastify";d="AWS SNS publisher"},
    @{n="event-replay-service";l="node";f="fastify";d="Event replay and backfill"}
)
foreach ($s in $messagingServices) { New-Service "messaging" $s.n $s.l $s.f $s.d }

Write-Host "`n=== INFRA SERVICES ===" -ForegroundColor Cyan
$infraServices = @(
    @{n="api-gateway";l="go";f="gin";d="API gateway and routing"},
    @{n="service-mesh-config";l="node";f="express";d="Istio service mesh configuration"},
    @{n="load-balancer-config";l="node";f="express";d="NGINX load balancer config"},
    @{n="bff-web";l="node";f="fastify";d="Backend-for-frontend web"},
    @{n="bff-mobile";l="node";f="fastify";d="Backend-for-frontend mobile"},
    @{n="graphql-gateway";l="node";f="nestjs";d="Apollo GraphQL federation gateway"},
    @{n="grpc-gateway";l="go";f="gin";d="gRPC to HTTP transcoding gateway"},
    @{n="cache-service";l="go";f="gin";d="Redis caching layer"},
    @{n="circuit-breaker-service";l="go";f="gin";d="Circuit breaker pattern service"},
    @{n="service-discovery";l="node";f="fastify";d="Service discovery with Consul"}
)
foreach ($s in $infraServices) { New-Service "infra" $s.n $s.l $s.f $s.d }

# ── Summary ──────────────────────────────────────────────────────────────────
Write-Host "`n============================================================" -ForegroundColor Yellow
Write-Host "  GENERATION COMPLETE" -ForegroundColor Yellow
Write-Host "============================================================" -ForegroundColor Yellow
Write-Host "  Total services generated: $totalCreated" -ForegroundColor Green
Write-Host "  Categories:" -ForegroundColor White
Write-Host "    Backend      : $($backendServices.Count) services" -ForegroundColor White
Write-Host "    Frontend     : $($frontendServices.Count) services" -ForegroundColor White
Write-Host "    Data         : $($dataServices.Count) services" -ForegroundColor White
Write-Host "    ML           : $($mlServices.Count) services" -ForegroundColor White
Write-Host "    Auth         : $($authServices.Count) services" -ForegroundColor White
Write-Host "    Search       : $($searchServices.Count) services" -ForegroundColor White
Write-Host "    Media        : $($mediaServices.Count) services" -ForegroundColor White
Write-Host "    Notification : $($notificationServices.Count) services" -ForegroundColor White
Write-Host "    Analytics    : $($analyticsServices.Count) services" -ForegroundColor White
Write-Host "    Payment      : $($paymentServices.Count) services" -ForegroundColor White
Write-Host "    Geo          : $($geoServices.Count) services" -ForegroundColor White
Write-Host "    Messaging    : $($messagingServices.Count) services" -ForegroundColor White
Write-Host "    Infra        : $($infraServices.Count) services" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Yellow
