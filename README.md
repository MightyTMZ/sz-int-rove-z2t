# Rove Miles Flight Search Tool

A comprehensive flight search and optimization platform built during internship to enhance travel planning capabilities with Rove Miles optimization.

## 🚀 Project Overview

The Rove Miles Flight Search Tool is a modern web application that integrates with the Amadeus API to provide real-time flight search capabilities with advanced filtering and value-per-mile calculations. 

### Key Features

- **Real-time Flight Search**: Live integration with Amadeus Flight Offers Search API
- **Value-per-Mile Optimization**: Calculate and sort flights by value per Rove Mile
- **Advanced Filtering**: Price, stops, departure time, and value-based filters
- **Multi-cabin Support**: Economy, Premium Economy, Business, and First Class options
- **Responsive Design**: Mobile-first approach with modern UI components
- **Comprehensive Data**: Detailed flight itineraries, pricing, and airline information

## 🏗️ Architecture

### Backend (Django)
- **Framework**: Django 5.1.7 with Django REST Framework
- **Database**: MySQL with Django ORM
- **API Integration**: Amadeus Flight Offers Search API v2
- **Data Models**: Comprehensive flight search and result storage

### Frontend (Next.js)
- **Framework**: Next.js 13 with TypeScript
- **Styling**: Tailwind CSS with Radix UI components
- **State Management**: React hooks with custom state management
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 📋 Prerequisites

- Python 3.8+
- Node.js 18+
- MySQL database
- Amadeus API credentials

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd s2-int-rove-z2t
```

### 2. Backend Setup (Django)
```bash
cd rove_miles
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a `.env` file in the `rove_miles` directory:
```env
SECRET_KEY=your_django_secret_key
DB_ENGINE=django.db.backends.postgresql
DB_NAME=your_db_name
DB_USER=your_db_user
DB_HOST=localhost
DB_PORT=3306
DB_PASSWORD=your_db_password
API_KEY=your_amadeus_api_key
API_SECRET=your_amadeus_api_secret
```

### 4. Database Setup
```bash
pip install pipenv
pipenv install # install all dependencies
pipenv shell # activate Python virtual environment
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser  # Optional (if you wish to use the admin interface)
```

### 5. Frontend Setup
```bash
cd ../rove-frontend
npm install
```

### 6. Start the Application
```bash
# Backend (in rove_miles directory)
python manage.py runserver

# Frontend (in rove-frontend directory)
npm run dev
```

## 🚀 Usage

### Flight Search
1. **Search Interface**: Enter origin and destination airports
2. **Date Selection**: Choose departure and return dates
3. **Passenger Configuration**: Set number of adults, children, and cabin class
4. **Rove Miles Input**: Enter your Rove Miles for value calculations
5. **Search Execution**: Click search to retrieve real-time flight options

### Advanced Filtering
- **Price Range**: Set maximum price limits
- **Stops**: Filter by maximum number of stops
- **Airlines**: Select preferred airlines
- **Departure Time**: Choose preferred departure time windows
- **Value per Mile**: Set minimum value-per-mile thresholds

### Sorting Options
- Price (low to high / high to low)
- Duration (shortest first)
- Departure time (earliest first)
- Value per mile (best value first)

## 🔧 API Endpoints

### Flight Search
- `POST /searches/create-new-search/` - Create new flight search
- `GET /searches/flight-searches/` - List all flight searches
- `GET /searches/flight-searches/{id}/` - Get specific flight search details

### Request Format (example)
```json
{
  "origin_airport": "JFK",
  "destination_airport": "LAX",
  "departure_date": "2025-01-15",
  "return_date": "2025-01-20",
  "currency": "USD",
  "number_of_adults": 1,
  "number_of_children": 0,
  "cabin_class": "ECONOMY"
}
```

## 📊 Data Sources

### Amadeus API Integration
- **Flight Offers Search**: Real-time availability and pricing
- **Comprehensive Data**: Itineraries, segments, pricing, and amenities
- **Multi-currency Support**: Real-time exchange rates
- **Cabin Class Options**: Economy through First Class
- **Real-time Updates**: Live availability and pricing

### Data Collection Methods
- RESTful API calls with OAuth2 authentication
- Intelligent token management and caching
- Error handling and retry mechanisms
- Rate limiting compliance

## 🐳 Docker Deployment

### Build and Run
```bash
# Build the image
docker build -t rove-miles .

# Run the container
docker run -p 8000:8000 rove-miles

# Pull from DockerHub
docker pull mightytmz/s2-int-rove-z2t:latest
```

## 🔮 Future Improvements

### Enhanced Features
- Hotel and car rental integration
- Multi-city routing optimization
- Loyalty program integration beyond Rove Miles
- Advanced analytics and reporting
- Mobile app development

### Technical Enhancements
- Machine learning for price prediction
- Advanced caching and performance optimization
- Multi-language support
- Enhanced security and authentication

### Business Opportunities
- Partnership with travel agencies
- White-label solutions for corporate clients
- Revenue sharing with booking platforms

## 🧪 Testing

### Backend Testing
```bash
cd rove_miles
python manage.py test
```

### Frontend Testing
```bash
cd rove-frontend
npm run test
```

## 📚 Technical Documentation

### Code Structure
- **Models**: `rove_miles/search/models.py` - Database schema
- **Views**: `rove_miles/search/views.py` - API endpoints and business logic
- **Serializers**: `rove_miles/search/serializers.py` - Data serialization
- **Flight Search**: `rove_miles/search/search_flights.py` - Amadeus API integration
- **Frontend Components**: `rove-frontend/components/` - React components

### Key Algorithms
- **Value-per-Mile Calculation**: `Price ÷ Rove Miles = Value per Mile`
- **Flight Filtering**: Multi-criteria filtering system
- **Sorting Algorithms**: Price, duration, time, and value-based sorting
- **Token Management**: Intelligent caching and refresh mechanisms

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Note**: Make sure to push to GitHub regularly. If you are in charge of using Docker, make sure to push to DockerHub once in a while with a new tag. Pull from GitHub before pushing code to minimize the risk of conflicts.

Special thanks to our amazing team and their contributions!

Team Members:
- Landon Turk
- Nathan Zhang
- Naya Ramadan
- Rahil Menta
- Tom Zhang
- Vishva Rao
- Winston Chen

Taryn Riddle - Product Manager

Co-Founder of Rove (YC W24) and Program Director of HUVSTP - Arhan Chhabra

Lastly, shoutout to our other program directors Anaiy Somalwar and Caleb Kline!
