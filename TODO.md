# AI News Hub - Detailed TODO List

## 🚀 Phase 1: Core Functionality Improvements

### 1. Implement Pagination System
**Priority: High** | **Estimated Time: 2-3 days**

#### Sub-tasks:
- [ ] **1.1** Create pagination state management in `use-news.ts` hook
  - [ ] Add `currentPage`, `totalPages`, `hasNextPage`, `hasPrevPage` states
  - [ ] Add `goToPage`, `nextPage`, `prevPage` functions
- [ ] **1.2** Update API route (`/api/news/route.ts`) to support pagination
  - [ ] Add `page` and `pageSize` query parameters
  - [ ] Implement proper offset calculation
  - [ ] Return pagination metadata in response
- [ ] **1.3** Create Pagination UI component
  - [ ] Design pagination component using existing UI library
  - [ ] Add page numbers, previous/next buttons
  - [ ] Show current page and total pages
- [ ] **1.4** Integrate pagination into main page
  - [ ] Update `page.tsx` to use pagination component
  - [ ] Handle page changes and loading states
- [ ] **1.5** Testing
  - [ ] Test pagination with different page sizes
  - [ ] Ensure proper loading states
  - [ ] Test edge cases (first/last page)

### 2. Remove Current Filtering Logic
**Priority: Medium** | **Estimated Time: 1 day**

#### Sub-tasks:
- [ ] **2.1** Identify current filtering implementations
  - [ ] Check `use-news.ts` for search-based filtering
  - [ ] Review API route filtering logic
- [ ] **2.2** Remove or simplify filtering
  - [ ] Keep basic search functionality
  - [ ] Remove complex category filtering if exists
- [ ] **2.3** Update UI accordingly
  - [ ] Remove filter UI elements if any
  - [ ] Simplify search interface

### 3. Implement Load More / Infinite Scroll
**Priority: High** | **Estimated Time: 2-3 days**

#### Sub-tasks:
- [ ] **3.1** Choose implementation approach
  - [ ] Decide between "Load More" button vs infinite scroll
  - [ ] Consider user experience and performance
- [ ] **3.2** Update data fetching logic
  - [ ] Modify `use-news.ts` to support incremental loading
  - [ ] Add `loadMore` function and `hasMore` state
  - [ ] Implement article accumulation (append new articles)
- [ ] **3.3** Update API to support cursor-based pagination
  - [ ] Add `offset` parameter support
  - [ ] Return `hasMore` flag in response
- [ ] **3.4** Implement UI component
  - [ ] Create "Load More" button component OR
  - [ ] Implement intersection observer for infinite scroll
- [ ] **3.5** Integration and optimization
  - [ ] Add loading states for incremental loads
  - [ ] Prevent duplicate requests
  - [ ] Handle error states during load more

## 🔌 Phase 2: API Integration Expansion

### 4. Implement 2 Additional API Sources
**Priority: High** | **Estimated Time: 4-5 days**

#### Sub-tasks:
- [ ] **4.1** Research and select APIs
  - [ ] Identify 2 additional news API sources (e.g., Guardian API, Reddit API, Google News API)
  - [ ] Check rate limits, pricing, and terms of service
  - [ ] Obtain API keys
- [ ] **4.2** Create API integration modules
  - [ ] Create `lib/guardianapi.ts` (or chosen API)
  - [ ] Create `lib/secondapi.ts` (or chosen API)
  - [ ] Implement data transformation functions
- [ ] **4.3** Update type definitions
  - [ ] Extend `lib/types.ts` for new API response formats
  - [ ] Create union types for multiple sources
- [ ] **4.4** Modify news aggregation logic
  - [ ] Update `/api/news/route.ts` to fetch from multiple sources
  - [ ] Implement data merging and deduplication
  - [ ] Add source attribution to articles
- [ ] **4.5** Update UI to show article sources
  - [ ] Add source badges to article cards
  - [ ] Update article metadata display
- [ ] **4.6** Testing and optimization
  - [ ] Test all API integrations
  - [ ] Implement error handling for failed API calls
  - [ ] Add fallback mechanisms

## 📄 Phase 3: Additional Pages

### 5. Category Page
**Priority: Medium** | **Estimated Time: 2 days**

#### Sub-tasks:
- [ ] **5.1** Create category page structure
  - [ ] Create `app/category/[slug]/page.tsx`
  - [ ] Create `app/category/page.tsx` (category listing)
- [ ] **5.2** Implement category filtering
  - [ ] Update API to filter by specific categories
  - [ ] Create category-specific data fetching
- [ ] **5.3** Design category page layout
  - [ ] Create category header component
  - [ ] Design article grid for category view
  - [ ] Add breadcrumb navigation
- [ ] **5.4** Update navigation
  - [ ] Add category links to main navigation
  - [ ] Create category dropdown menu

### 6. About Page
**Priority: Low** | **Estimated Time: 1 day**

#### Sub-tasks:
- [ ] **6.1** Create page structure
  - [ ] Create `app/about/page.tsx`
- [ ] **6.2** Write content
  - [ ] Mission statement
  - [ ] Team information
  - [ ] Technology stack explanation
- [ ] **6.3** Design layout
  - [ ] Use existing UI components
  - [ ] Add hero section
  - [ ] Include contact information

### 7. Privacy Policy Page
**Priority: Low** | **Estimated Time: 0.5 days**

#### Sub-tasks:
- [ ] **7.1** Create `app/privacy/page.tsx`
- [ ] **7.2** Write privacy policy content
- [ ] **7.3** Format using existing UI components

### 8. Terms of Service Page
**Priority: Low** | **Estimated Time: 0.5 days**

#### Sub-tasks:
- [ ] **8.1** Create `app/terms/page.tsx`
- [ ] **8.2** Write terms of service content
- [ ] **8.3** Format using existing UI components

### 9. Contact Page
**Priority: Low** | **Estimated Time: 1 day**

#### Sub-tasks:
- [ ] **9.1** Create `app/contact/page.tsx`
- [ ] **9.2** Design contact form using existing form components
- [ ] **9.3** Implement form submission (consider using a service like Formspree)
- [ ] **9.4** Add contact information and social links

## 🎨 Phase 4: UI/UX Improvements

### 10. Fix Dark Mode Issues
**Priority: High** | **Estimated Time: 1 day**

#### Sub-tasks:
- [ ] **10.1** Fix "Read More" text hover issue in dark mode
  - [ ] Locate the hover styling in article cards
  - [ ] Update CSS to use proper dark mode colors
  - [ ] Test hover states in both light and dark themes
- [ ] **10.2** Fix default theme initialization
  - [ ] Check `components/theme-provider.tsx`
  - [ ] Ensure proper system theme detection
  - [ ] Fix defaultTheme setting in layout
- [ ] **10.3** Comprehensive dark mode testing
  - [ ] Test all components in dark mode
  - [ ] Verify color contrast ratios
  - [ ] Check accessibility standards

### 11. Add Image Placeholders
**Priority: Medium** | **Estimated Time: 0.5 days**

#### Sub-tasks:
- [ ] **11.1** Create placeholder image component
  - [ ] Design a news-themed placeholder
  - [ ] Add to `components/ui/` folder
- [ ] **11.2** Update article card component
  - [ ] Add conditional rendering for missing images
  - [ ] Implement fallback to placeholder
- [ ] **11.3** Optimize image loading
  - [ ] Add proper error handling for broken images
  - [ ] Consider lazy loading implementation

### 12. Improve Category Classification
**Priority: Medium** | **Estimated Time: 1 day**

#### Sub-tasks:
- [ ] **12.1** Review current categorization logic in `lib/newsapi.ts`
- [ ] **12.2** Expand keyword matching
  - [ ] Add more comprehensive keyword lists
  - [ ] Implement fuzzy matching for better accuracy
- [ ] **12.3** Create "General AI" or "Technology" default category
  - [ ] Replace "Unknown" with more descriptive default
  - [ ] Update category colors and styling
- [ ] **12.4** Add manual category override system
  - [ ] Allow manual categorization for specific sources
  - [ ] Create category mapping configuration

## 🔧 Phase 5: Technical Improvements

### 13. Performance Optimization
**Priority: Medium** | **Estimated Time: 2 days**

#### Sub-tasks:
- [ ] **13.1** Implement proper caching
  - [ ] Add API response caching
  - [ ] Implement client-side caching for articles
- [ ] **13.2** Image optimization
  - [ ] Implement Next.js Image component
  - [ ] Add image compression
- [ ] **13.3** Bundle optimization
  - [ ] Analyze bundle size
  - [ ] Implement code splitting where appropriate

### 14. Error Handling & User Experience
**Priority: Medium** | **Estimated Time: 1 day**

#### Sub-tasks:
- [ ] **14.1** Improve error states
  - [ ] Create better error UI components
  - [ ] Add retry mechanisms
- [ ] **14.2** Add loading skeletons
  - [ ] Create skeleton components for article cards
  - [ ] Implement throughout the application
- [ ] **14.3** Add toast notifications
  - [ ] Implement for successful/failed actions
  - [ ] Use existing toast UI component

---

## 📋 Implementation Order Recommendation:

1. **Start with Phase 1** (Core Functionality) - Most impactful for user experience
2. **Move to Phase 4** (UI/UX) - Quick wins that improve user experience
3. **Implement Phase 2** (API Integration) - Adds significant value
4. **Add Phase 3** (Additional Pages) - Nice-to-have features
5. **Finish with Phase 5** (Technical Improvements) - Polish and optimization

## 📊 Estimated Total Time: 15-20 days

Each phase can be worked on independently, and within each phase, sub-tasks can often be parallelized or tackled in different orders based on priority and dependencies.