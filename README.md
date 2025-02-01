# UFC Analytics

## Overview

UFC Analytics is a fight video analysis tool that leverages Python and MediaPipe to distinguish between various striking and grappling techniques in UFC fights. The project processes YouTube fight footage and classifies techniques such as jabs, crosses, leg kicks, body kicks, and takedown attempts.

## Features

- **Technique Classification**: Identifies key MMA techniques using computer vision.
- **YouTube Video Processing**: Extracts frames and processes them for analysis.
- **Machine Learning Integration**: Uses models to enhance accuracy in classification.
- **Event Data Storage**: Stores fight predictions and analysis in structured formats.

## Setup & Installation

### Prerequisites

- Python 3.x
- Node.js (for frontend components, if applicable)
- Virtual environment (recommended)

### Backend Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ufc_analytics.git
cd ufc_analytics

# Create a virtual environment
python -m venv venv
source venv/bin/activate   # On Windows use 'venv\Scripts\activate'

# Install dependencies
pip install -r requirements.txt
```

### Frontend Setup (if applicable)

```bash
cd ufc_website
npm install
npm start
```

## Usage

1. Provide a YouTube video link for analysis.
2. The system processes the video and classifies techniques.
3. The results are stored and displayed via the frontend.
