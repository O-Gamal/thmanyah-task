# 🎧 Thmanyah Content Directory

> A full-stack podcast discovery platform built as a technical assessment for Thmanyah

## 📋 Project Overview

A podcast discovery platform that allows users to search and browse podcasts using the iTunes Search API. Built with NestJS and Next.js.

**Live Demo**: https://thmanyah-task-web.vercel.app/

## 🎯 The Challenge

The task was to build a REST API that:

- Accepts search terms as input parameters
- Integrates with iTunes Search API for podcast discovery
- Stores search results in a database
- Returns structured responses
- Provides a frontend interface for content browsing

## 🚀 Technical Architecture

### Backend (NestJS + PostgreSQL)

- **Framework**: NestJS with TypeScript for type safety and scalability
- **Database**: PostgreSQL (AWS RDS) with Drizzle ORM for efficient data management
- **API Integration**: iTunes Search API for podcast discovery
- **Architecture**: Modular design with dedicated services for search and media handling

### Frontend (Next.js + Tailwind)

- **Framework**: Next.js 15 with App Router for optimal performance
- **Styling**: Tailwind CSS for responsive, modern UI
- **Image Optimization**: Custom lazy loading and WebP conversion
- **Internationalization**: RTL support for Arabic content

## 🏗️ Project Structure

```
thmanyah-content-directory/
├── apps/
│   ├── api/                    # NestJS Backend
│   │   ├── src/
│   │   │   ├── search-media/   # Search functionality
│   │   │   ├── itunes/         # iTunes API integration
│   │   │   └── drizzle/        # Database schema & config
│   │   └── drizzle/            # Database migrations
│   └── web/                    # Next.js Frontend
│       ├── app/
│       │   ├── feed/[id]/      # Dynamic podcast pages
│       │   └── search-results/ # Search results display
│       └── components/         # Reusable UI components
├── packages/
│   ├── types/                  # Shared TypeScript types
│   ├── eslint-config/          # Shared linting configuration
│   └── typescript-config/      # Shared TypeScript configuration
```

## ✨ Key Features

### 🔍 **Smart Search & Discovery**

- Real-time podcast search using iTunes API
- Intelligent caching to reduce API calls
- Arabic language support with RTL layout

### 📱 **Responsive Design**

- Mobile-first approach with Tailwind CSS
- Adaptive layouts for different screen sizes
- Touch-friendly interactions

### 🖼️ **Image Optimization**

- Lazy loading implementation
- WebP conversion for better performance
- Graceful fallbacks for missing images

### 🗄️ **Database Management**

- Efficient schema design with Drizzle ORM
- Automated migrations
- Optimized queries for fast data retrieval

## 🔧 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone https://github.com/O-Gamal/thmanyah-task.git
cd thmanyah-content-directory

# Install dependencies
pnpm install

# Set up environment variables
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env

# Run database migrations
cd apps/api && pnpm db:generate && pnpm db:migrate

# Start development servers
pnpm dev
```

---

Built with ❤️ by Omar for Thmanyah

**Note**: This project was built as a technical assessment for Thmanyah, demonstrating full-stack development capabilities and problem-solving skills in a real-world scenario.
