
.
├── .expo/                        # Expo project configuration and metadata
│   ├── README.md                 # Expo-specific readme
│   ├── devices.json              # Expo device info
│   └── types/
│       └── router.d.ts           # Type definitions for Expo router
├── .gitignore                    # Git ignored files list
├── app/
│   ├── +not-found.tsx            # 404 not found page for app routing
│   ├── _layout.tsx               # Main layout for the app
│   ├── appointments/
│   │   ├── create.tsx            # Create new appointment page
│   │   ├── [id].tsx              # Appointment detail/edit page
│   │   ├── Success.tsx           # Appointment success page
│   │   └── Failure.tsx           # Appointment failure page
│   ├── orders/
│   │   ├── index.tsx             # List all orders
│   │   ├── [id].tsx              # Order detail view
│   │   ├── payment-razorpay.tsx  # Razorpay payment integration
│   │   ├── OrderSuccess.tsx      # Order success page
│   │   ├── OrderFailure.tsx      # Order failure page
│   │   ├── PaymentSuccess.tsx    # Payment success page
│   │   └── PaymentFailure.tsx    # Payment failure page
│   ├── measurements/
│   │   ├── index.tsx            # List and manage user measurements
│   │   ├── [id].tsx             # Measurement detail/edit page
│   │   └── Create.tsx           # Add new measurement page
│   └── (tabs)/                   # Main tab navigation pages
│       ├── _layout.tsx           # Layout for tabs
│       ├── appointments.tsx      # Tab for appointments
│       ├── favourites.tsx        # Tab for user's favourite items
│       ├── index.tsx             # Main tab index/landing
│       └── profile.tsx           # User profile tab
├── app.json                      # Expo app configuration
├── assets/
│   └── images/
│       ├── favicon.png           # App favicon
│       └── icon.png              # App icon
├── components/
│   ├── buttons/
│   │   └── FloatingActionButton.tsx # Floating action button component
│   ├── cards/
│   │   ├── AppointmentCard.tsx   # Card for displaying appointment summary
│   │   ├── ServiceCard.tsx       # Card for displaying service summary
│   │   ├── OrderCard.tsx         # Card for displaying order summary
│   │   └── TailorCard.tsx        # Card for displaying tailor info
│   ├── inputs/
│   │   └── SearchBar.tsx         # Search bar input component
│   ├── reviews/
│   │   ├── ReviewCard.tsx       # Card for displaying a review
│   │   └── ReviewForm.tsx       # Form for submitting a review
│   └── service/
│       └── ServiceDetail.tsx     # Component for service detail view
│   └── feedback/
│       ├── SuccessBanner.tsx     # Generic success banner/modal
│       └── ErrorBanner.tsx       # Generic error banner/modal
├── constants/
│   └── theme.ts                  # Theme and style constants
├── data/
│   └── appointments.ts           # Mock or static data for appointments
├── expo-env.d.ts                 # TypeScript environment definitions for Expo
├── hooks/
│   └── useFrameworkReady.ts      # Custom hook for framework readiness
│   ├── useAuth.ts               # Auth state and actions
│   ├── useAppointments.ts       # Appointment logic
│   ├── useOrders.ts             # Order logic
│   ├── useProfile.ts            # Profile logic
│   ├── useAddresses.ts          # Address logic
│   ├── useChat.ts               # Chat logic
│   ├── useAITailor.ts           # AI tailor logic
│   ├── useNotifications.ts      # Notification state and actions
│   ├── useHistory.ts            # Order/appointment history logic
│   ├── usePromo.ts              # Promo code/discount logic
│   ├── useMeasurements.ts       # Measurement management logic
│   ├── useSupport.ts            # FAQ/help/support logic
│   ├── useReferral.ts           # Referral/invite logic
│   ├── useLegal.ts              # Terms/privacy/legal logic
│   ├── useReviews.ts            # Review and rating logic
│   └── useFrameworkReady.ts      # Custom hook for framework readiness
├── node_modules/                 # (Standard dependency folder, contents omitted)
├── package-lock.json             # NPM lock file
├── package.json                  # Project dependencies and scripts
├── clients/
│   ├── supabase.ts                # Supabase client config
│   ├── tailorAI.ts                # TailorAI client config
│   ├── sms.ts                     # SMS client config 
│   ├── email.ts                   # Email client config
│   └── types.ts                   # Shared client types/interfaces
├── services/
│   ├── authService.ts           # Phone auth logic
│   ├── appointmentService.ts    # Appointment CRUD, photo upload
│   ├── orderService.ts          # Order management/payment
│   ├── profileService.ts        # User profile management
│   ├── addressService.ts        # Address management
│   ├── chatService.ts           # Real-time chat with tailor
│   ├── aiTailorService.ts       # AI tailor chat/logic
│   ├── notificationService.ts   # Notification logic (push/in-app)
│   ├── historyService.ts        # Fetch order/appointment history
│   ├── promoService.ts          # Promo code/discount logic
│   ├── measurementService.ts    # Measurement management logic
│   ├── supportService.ts        # FAQ/help/support logic
│   ├── referralService.ts       # Referral/invite logic
│   ├── legalService.ts          # Terms/privacy/legal logic
│   ├── reviewService.ts         # Review and rating logic
│   └── service.ts               # Service logic
└── tsconfig.json                 # TypeScript configuration 








# Tailor On Demand App - File Structure Documentation

This document provides detailed explanations of what each file in the Tailor On Demand application should contain, with special focus on the AI-related functionality.

## App Directory Structure

### Root App Files

- **app/_layout.tsx**
  - Main layout wrapper for the entire application
  - Sets up authentication providers, theme providers, and global error boundaries
  - Includes main navigation structure and initialization logic

- **app/+not-found.tsx**
  - Custom 404 page to handle routes that don't exist
  - Should include user-friendly error message and navigation back to main screens

### Appointment Pages

- **app/appointments/create.tsx**
  - Form for creating new tailor appointments
  - Includes date/time pickers, service selection, tailor selection
  - Address and special instructions fields
  - Submit handler that calls appointmentService

- **app/appointments/[id].tsx**
  - Dynamic route for viewing and editing specific appointments
  - Shows appointment details, status, and attached images
  - Includes options to reschedule, cancel, or modify appointment
  - Uses appointmentService for data fetching and updates

- **app/appointments/Success.tsx**
  - Confirmation page shown after successful appointment creation
  - Displays appointment details and next steps
  - Options to add to calendar or share appointment details

- **app/appointments/Failure.tsx**
  - Error page for failed appointment creation
  - Clear error messaging and troubleshooting suggestions
  - Option to retry or contact support

### Order Pages

- **app/orders/index.tsx**
  - List view of all user orders
  - Filtering by status, date range, and order type
  - Pagination or infinite scroll for large order histories
  - Uses orderService for data fetching

- **app/orders/[id].tsx**
  - Order detail page showing specific order information
  - Order status, items, pricing breakdown, and timeline
  - Options to track, cancel, or modify order if appropriate
  - Uses orderService for data operations

- **app/orders/payment-razorpay.tsx**
  - Integration with Razorpay payment gateway
  - Handles payment initialization and callbacks
  - Processes payment success and failure events
  - Securely manages payment tokens

- **app/orders/OrderSuccess.tsx**
  - Success page after order completion
  - Order summary and confirmation details
  - Next steps and tracking information

- **app/orders/OrderFailure.tsx**
  - Error handling for failed orders
  - Clear error messaging and recovery options
  - Support contact information

- **app/orders/PaymentSuccess.tsx**
  - Confirmation page after successful payment
  - Payment receipt and order details
  - Next steps in the order process

- **app/orders/PaymentFailure.tsx**
  - Error handling for failed payments
  - Options to retry payment or choose alternative methods
  - Troubleshooting suggestions

### Measurement Pages

- **app/measurements/index.tsx**
  - List and management interface for user's stored measurements
  - Option to create new measurement sets
  - Edit or delete existing measurements
  - Uses measurementService for CRUD operations

- **app/measurements/[id].tsx**
  - Detail view for specific measurement set
  - Form to edit individual measurements
  - Validation for measurement values
  - Save/update functionality

- **app/measurements/Create.tsx**
  - Form to create new measurement set
  - Input fields for all required measurements
  - Option to name and categorize the measurement set
  - Save functionality using measurementService

### AI Pages

- **app/ai/_layout.tsx**
  - Layout wrapper for AI-related screens
  - Sets up AI context providers
  - Handles AI-specific navigation elements and shared UI

- **app/ai/chat.tsx**
  - Main AI chat interface
  - Message list displaying conversation history
  - Input area for user messages
  - Integration with suggestion chips for quick interactions
  - Real-time response rendering
  - Uses useAiChat hook for state management

- **app/ai/history.tsx**
  - Displays all past AI conversations
  - Grouped by date or topic
  - Options to continue previous conversations
  - Delete conversation functionality
  - Uses useAiHistory hook

- **app/ai/settings.tsx**
  - AI assistant customization options
  - Toggle features like voice input
  - Personalization settings
  - Privacy controls for AI data
  - Clear history option

### Tab Navigation

- **app/(tabs)/_layout.tsx**
  - Tab bar configuration and layout
  - Tab navigation setup with routes
  - Badge indicators for notifications
  - Animation and transition settings

- **app/(tabs)/index.tsx**
  - Home tab/landing page
  - Featured services and promotions
  - Quick action buttons
  - Recent activity summary

- **app/(tabs)/appointments.tsx**
  - Tab for viewing upcoming and past appointments
  - Calendar view option
  - Quick actions for appointment management
  - Uses useAppointments hook

- **app/(tabs)/create-tab.tsx**
  - Quick access to create new orders or appointments
  - Service category selection
  - Action buttons leading to relevant creation flows

- **app/(tabs)/favourites.tsx**
  - List of user's saved/favourite services or tailors
  - Options to organize and filter favourites
  - Quick actions to book or order

- **app/(tabs)/ai.tsx**
  - Entry point to AI assistant features
  - Quick actions to start new chat
  - Recent conversation snippets
  - Suggestion prompts based on user history

- **app/(tabs)/profile.tsx**
  - User profile management
  - Account settings
  - Measurement profiles
  - Order history access
  - Support and help options
  - Uses useProfile hook

## Components

### Button Components

- **components/buttons/FloatingActionButton.tsx**
  - Reusable floating action button
  - Customizable icon and action
  - Animation properties
  - Position customization

### Card Components

- **components/cards/AppointmentCard.tsx**
  - Card display for appointment summary
  - Shows date, time, service type, and status
  - Action buttons for common operations
  - Status indicator with appropriate styling

- **components/cards/ServiceCard.tsx**
  - Card display for service offerings
  - Image, title, price, and brief description
  - Rating display if applicable
  - Action buttons (book, favorite, etc.)

- **components/cards/OrderCard.tsx**
  - Card display for order summary
  - Order ID, date, items, status, and total
  - Progress indicator for order status
  - Quick action buttons

- **components/cards/TailorCard.tsx**
  - Display for tailor profile information
  - Photo, name, specialties, and rating
  - Availability indicator
  - Action buttons to book or contact

### Input Components

- **components/inputs/SearchBar.tsx**
  - Reusable search input component
  - Auto-suggestion functionality
  - Clear button
  - Search history integration
  - Filter options

### Review Components

- **components/reviews/ReviewCard.tsx**
  - Display for individual reviews
  - Star rating, user info, date, and comment text
  - Helpful/not helpful buttons if applicable
  - Report inappropriate content option

- **components/reviews/ReviewForm.tsx**
  - Form for submitting new reviews
  - Star rating selector
  - Text input for comments
  - Photo attachment option
  - Submit handling with reviewService

### Service Components

- **components/service/ServiceDetail.tsx**
  - Detailed view of a service offering
  - Comprehensive information about the service
  - Pricing details and options
  - Related services suggestions
  - Book now button

### Feedback Components

- **components/feedback/SuccessBanner.tsx**
  - Reusable success notification component
  - Customizable message and duration
  - Optional action button
  - Animation effects

- **components/feedback/ErrorBanner.tsx**
  - Reusable error notification component
  - Customizable error message
  - Retry or dismiss options
  - Consistent styling for error states

### AI Components

- **components/ai/ChatBubble.tsx**
  - Individual message bubble in AI chat
  - Different styles for user vs. AI messages
  - Support for text, suggestions, and service recommendations
  - Timestamp display
  - Loading state for AI responses
  - Action buttons for message-specific actions

- **components/ai/ChatInput.tsx**
  - Text input area for AI chat
  - Send button
  - Voice input toggle
  - Attachment options if applicable
  - Typing indicators
  - Character count

- **components/ai/SuggestionChip.tsx**
  - Quick suggestion buttons that appear in chat
  - Horizontal scrollable list of common queries
  - Context-aware suggestions based on conversation
  - Custom styling for selected state

- **components/ai/VoiceInput.tsx**
  - Voice recording and processing component
  - Recording indicator and animation
  - Transcription display
  - Cancel and submit buttons
  - Permission handling

- **components/ai/AiLoader.tsx**
  - Loading animation for AI responses
  - Typing indicator or pulsing animation
  - Customizable appearance
  - Accessibility considerations

## Hooks

- **hooks/useAuth.ts**
  - Authentication state management
  - Login/logout functions
  - User session handling
  - Auth state persistence
  - Token refresh logic

- **hooks/useAppointments.ts**
  - CRUD operations for appointments
  - Appointment state management
  - Filtering and sorting functions
  - Appointment status tracking

- **hooks/useOrders.ts**
  - Order state management
  - CRUD operations for orders
  - Order filtering and history
  - Order status tracking and updates

- **hooks/useProfile.ts**
  - User profile state and operations
  - Profile update functions
  - User preferences management
  - Profile data validation

- **hooks/useAddresses.ts**
  - Address management functions
  - CRUD for user addresses
  - Default address selection
  - Address validation

- **hooks/useChat.ts**
  - Real-time chat with human tailors
  - Message state management
  - Read receipts and typing indicators
  - Chat history persistence

- **hooks/useAITailor.ts**
  - AI tailor-specific logic
  - Measurement recommendations
  - Style suggestions
  - Fabric recommendations

- **hooks/useNotifications.ts**
  - Push and in-app notification handling
  - Notification preferences
  - Read/unread state management
  - Notification actions

- **hooks/useHistory.ts**
  - Order and appointment history
  - History filtering and search
  - Export functionality if applicable

- **hooks/usePromo.ts**
  - Promo code validation and application
  - Discount calculations
  - Promo eligibility checks
  - Expiration handling

- **hooks/useMeasurements.ts**
  - Measurement data management
  - CRUD for measurement sets
  - Validation and formatting
  - Default measurement selection

- **hooks/useSupport.ts**
  - FAQ and help content
  - Support ticket creation
  - Contact methods handling
  - Common issue resolution

- **hooks/useReferral.ts**
  - Referral program management
  - Share links and codes
  - Referral tracking
  - Reward monitoring

- **hooks/useLegal.ts**
  - Access to terms, privacy policy
  - Consent management
  - Version tracking for legal documents
  - Acceptance status tracking

- **hooks/useReviews.ts**
  - Review submission and management
  - Rating calculations
  - Review moderation if applicable
  - Helpful/not helpful voting

- **hooks/useFrameworkReady.ts**
  - Checks if native framework components are ready
  - Platform-specific initialization
  - Loading state management
  - Error handling for framework issues

- **hooks/useAiChat.ts**
  - AI chat state management
  - Message handling and formatting
  - Context management for ongoing conversations
  - Integration with AI service endpoints
  - Recommendation and suggestion state

- **hooks/useAiHistory.ts**
  - Chat history persistence and retrieval
  - Conversation grouping and organization
  - Search and filter functionality
  - Delete and archive operations

- **hooks/useAiContext.ts**
  - Access to global AI context
  - User preference integration
  - AI personalization state
  - Context switching between conversations

## Services

- **services/authService.ts**
  - Phone authentication implementation
  - OTP verification
  - Session management
  - Auth token handling
  - User registration and profile creation

- **services/appointmentService.ts**
  - API calls for appointment management
  - Appointment creation, retrieval, updates
  - Date availability checking
  - Photo upload for garments
  - Appointment status updates

- **services/orderService.ts**
  - Order creation and management
  - Payment processing initialization
  - Order status updates and tracking
  - Order history retrieval
  - Cart to order conversion

- **services/profileService.ts**
  - User profile CRUD operations
  - Profile image upload
  - User preference management
  - Profile data validation and formatting

- **services/addressService.ts**
  - Address CRUD operations
  - Address verification
  - Default address management
  - Location services integration if applicable

- **services/chatService.ts**
  - Real-time chat with human tailors
  - Message delivery and receipt
  - Chat history persistence
  - File/image sharing in chat
  - Typing indicators

- **services/aiTailorService.ts**
  - AI-specific tailor functionality
  - Style analysis
  - Measurement guidance
  - Fabric recommendations
  - Design suggestions

- **services/notificationService.ts**
  - Push notification setup and handling
  - In-app notification management
  - Notification preferences
  - Token management for push services
  - Scheduled notifications

- **services/historyService.ts**
  - Order and appointment history retrieval
  - History search and filtering
  - Export functionality
  - Data aggregation for history views

- **services/promoService.ts**
  - Promo code validation
  - Discount application logic
  - Coupon redemption
  - Special offer handling

- **services/measurementService.ts**
  - Measurement data CRUD operations
  - Measurement validation
  - Standard size conversions
  - Measurement history tracking

- **services/supportService.ts**
  - FAQ retrieval
  - Support ticket creation
  - Help content management
  - Contact channel handling

- **services/referralService.ts**
  - Referral code generation
  - Referral tracking
  - Reward processing
  - Share functionality

- **services/legalService.ts**
  - Terms and conditions retrieval
  - Privacy policy management
  - Consent recording
  - Legal document versioning

- **services/reviewService.ts**
  - Review submission handling
  - Rating aggregation
  - Review moderation if applicable
  - Review retrieval and filtering

- **services/service.ts**
  - Service catalog management
  - Service details retrieval
  - Pricing information
  - Service availability checking

- **services/aiChatService.ts**
  - API calls to AI service providers
  - Message formatting for AI processing
  - Response parsing and formatting
  - Error handling for AI requests
  - Context management between messages
  - Integration with suggestion and recommendation engines

- **services/aiHistoryService.ts**
  - Chat history storage in local or cloud database
  - Conversation retrieval and pagination
  - History search functionality
  - Conversation metadata management
  - Data export and cleanup operations

- **services/aiVoiceService.ts**
  - Voice input processing
  - Speech-to-text conversion
  - Voice recording and file management
  - Permission handling for microphone
  - Voice data cleanup

## Clients

- **clients/supabase.ts**
  - Supabase client configuration
  - Authentication integration
  - Database query helpers
  - Real-time subscription setup
  - File storage configuration

- **clients/tailorAI.ts**
  - AI service client configuration
  - API key management
  - Request formatting
  - Response parsing
  - Error handling

- **clients/sms.ts**
  - SMS service provider integration
  - Message formatting
  - Delivery status tracking
  - OTP message handling

- **clients/email.ts**
  - Email service configuration
  - Template rendering
  - Attachment handling
  - Delivery tracking

- **clients/types.ts**
  - Shared type definitions for client interfaces
  - Response and request types
  - Error types
  - Authentication types

## Contexts

- **contexts/AiContext.tsx**
  - React context provider for AI functionality
  - Global AI state management
  - AI preference storage
  - Context provider wrapper component
  - Utility functions for AI state manipulation

## Types

- **types/ai.ts**
  - TypeScript interfaces for AI data structures
  - Message types
  - AI response formats
  - Suggestion and recommendation types
  - Chat history types

- **types/common.ts**
  - Shared type definitions used across the app
  - User profile interfaces
  - Address formats
  - Order and appointment types
  - Service and product interfaces

## Utils

- **utils/aiMessageFormatter.ts**
  - Functions to format messages for AI processing
  - Response parsing utilities
  - Message sanitization
  - Rich content handling (links, images, etc.)

- **utils/aiPromptBuilder.ts**
  - Helper functions to construct effective AI prompts
  - Context injection utilities
  - Prompt templates for common scenarios
  - User preference integration

- **utils/dateFormatters.ts**
  - Date formatting and parsing utilities
  - Time zone handling
  - Relative time functions (e.g., "2 days ago")
  - Date validation

- **utils/validators.ts**
  - Form validation helpers
  - Input sanitization
  - Common validation patterns (email, phone, etc.)
  - Error message formatting

- **utils/storage.ts**
  - Local storage wrappers
  - Secure storage for sensitive data
  - Storage cleanup utilities
  - Cache management

## Config Files

- **app.json**
  - Expo application configuration
  - App metadata and settings
  - Plugin configurations
  - Build settings for different platforms

- **tsconfig.json**
  - TypeScript configuration
  - Compiler options
  - Path aliases
  - Type checking rules
