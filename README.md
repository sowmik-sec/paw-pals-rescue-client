
# Pet Donation and Adoption Platform

This project is a **Pet Donation and Adoption Platform** where users can donate to pet care campaigns, adopt pets, and manage pet donation campaigns. The platform allows users to request adoption, view donation statistics, and donate multiple times to a campaign.

## Features

- **Pet Listing**: View all pets that are available for adoption.
- **Donation Campaigns**: Users can donate to support pets.
- **User-Specific Donations**: Users can view their personal donation history.
- **Campaign Creation and Management**: Users can create and manage donation campaigns for pets.
- **Adoption Request**: Users can request adoption of pets and track the status of their request.
- **Donor Information**: Campaign creators can see who donated and how much.
- **Responsive Dashboard**: Detailed view of donations and donors in a user-friendly dashboard.

## Tech Stack

- **Frontend**:
  - React.js (with React Router)
  - Tailwind CSS for styling
  - TanStack Query for data fetching and caching
  - Axios for API requests
  - Firebase Authentication

- **Backend**:
  - Node.js with Express.js
  - MongoDB for data storage
  - Cloudinary for image hosting
  - Stripe for payment handling

## Key API Endpoints

### Pet Endpoints

- **GET /pets**: Fetches all pets based on status.
- **POST /pets**: Adds a new pet (used in the pet management form).
- **PATCH /make-adopted/:id**: Marks a pet as adopted.

### Donation Endpoints

- **GET /donation-campaign/:id**: Fetches donation details for a specific campaign.
- **GET /all-donations**: Fetches all donation campaigns with total donations and donors.
- **GET /my-donations**: Fetches donations made by the authenticated user.

## Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-repo.git](https://github.com/sowmik-sec/paw-pals-rescue-client
   ```

2. Navigate to the project directory:
   ```bash
   cd paw-pals-rescue-client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file for environment variables:
   ```bash
   VITE_API_BASE_URL=your_api_base_url
   VITE_PAYMENT_GATEWAY_PK=your_stripe_public_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Backend Setup

Ensure you have a MongoDB instance running and configure your `.env` with the correct MongoDB URI.

```bash
MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.mongodb.net/pet-adoption?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Firebase Setup

1. Go to [Firebase](https://firebase.google.com/) and create a new project.
2. Set up **Authentication** with email/password or any other method.
3. Configure Firebase in your project by copying your config to `firebase.config.js`.

## How to Use

1. **Create a Campaign**: 
   - Navigate to the "Add Campaign" page to create a new pet donation campaign.
   - Fill in the required fields, including the maximum donation amount, last date, and description.

2. **Donate to a Campaign**:
   - On the "Campaign Details" page, you can donate to a specific campaign using Stripe.

3. **View My Donations**:
   - Go to the "My Donations" page to view all the campaigns you have donated to, along with donation amounts.

4. **Manage Pets**:
   - View the pets you have added to the system and mark them as adopted if necessary.

## License

This project is licensed under the MIT License.
