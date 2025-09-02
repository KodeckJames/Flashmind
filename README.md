# 🧠 Flashmind AI

<div align="center">

![Study Buddy AI](https://img.shields.io/badge/Study%20Buddy-AI%20Powered-blue?style=for-the-badge&logo=openai)
![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)

**Transform any text into smart flashcards with AI-powered generation**

</div>

## ✨ Features

### 🤖 AI-Powered Flashcard Generation
- **Smart Content Analysis**: Uses OpenAI GPT-3.5 to extract key concepts from any text
- **Intelligent Question Generation**: Creates meaningful questions and answers automatically
- **Customizable Output**: Generates 5-10 flashcards per text input

### 📚 Interactive Study Experience
- **Study Mode**: Flip through flashcards with intuitive navigation
- **Progress Tracking**: Monitor correct/incorrect answers with accuracy percentage
- **Self-Assessment**: Mark your answers as correct or incorrect
- **Immediate Feedback**: Visual indicators for learning progress

### 💾 Persistent Storage
- **Save Flashcard Decks**: Store your generated flashcards with custom names
- **Quick Access**: Load saved decks instantly for review sessions
- **Deck Management**: Delete unwanted decks to keep your library organized

### 🎨 Beautiful User Interface
- **Modern Design**: Glass-morphism effects with gradient backgrounds
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Engaging transitions and hover effects
- **Intuitive Navigation**: Clean, user-friendly interface design

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- OpenAI API key
- Appwrite account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/study-buddy-ai.git
   cd study-buddy-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   APPWRITE_API_KEY=your_appwrite_api_key
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   NEXT_PUBLIC_APPWRITE_COLLECTION_ID=your_collection_id
   ```

4. **Configure Appwrite Database**
   
   Create a collection with the following attributes:
   - `name` (string, required) - Flashcard deck name
   - `flashcards` (array) - Array of flashcard objects
   - `createdAt` (datetime) - Creation timestamp
   - `updatedAt` (datetime) - Last update timestamp

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 13+ |
| **TypeScript** | Type Safety | Latest |
| **Tailwind CSS** | Styling | Latest |
| **OpenAI API** | AI Text Processing | GPT-3.5 |
| **Appwrite** | Backend Database | Latest |
| **Vercel AI SDK** | AI Integration | Latest |
| **Lucide React** | Icons | Latest |

## 🎯 Usage

### Creating Flashcards

1. **Input Text**: Paste any study material into the text area
2. **Generate**: Click "Generate Flashcards" to let AI create questions
3. **Review**: Browse through the generated flashcards
4. **Save**: Give your deck a name and save it for later

### Studying

1. **Load Deck**: Select a saved deck from the sidebar
2. **Study Mode**: Navigate through questions and reveal answers
3. **Self-Assess**: Mark answers as correct or incorrect
4. **Track Progress**: Monitor your accuracy and improvement

## 🔧 Configuration

### OpenAI Settings

The app uses GPT-3.5-turbo with the following configuration:
- **Temperature**: 0.7 (balanced creativity)
- **Max Tokens**: 1500 (sufficient for multiple flashcards)
- **Model**: gpt-3.5-turbo (cost-effective and fast)

### Appwrite Setup

1. Create a new project in [Appwrite Console](https://appwrite.io/console)
2. Set up a database with a collection for flashcards
3. Configure the required attributes as specified in installation
4. Update your environment variables with the project details

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Add environment variables in the Vercel project settings
   - Deploy!

### Other Deployment Options

- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment
- **DigitalOcean App Platform**: Container deployment

## 🧪 Development

### Project Structure

```
study-buddy-ai/
├── app/
│   ├── api/
│   │   └── generate-flashcards/
│   │       └── route.ts          # AI API endpoint
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main application
├── lib/
│   └── appwrite.ts              # Database configuration
├── types/
│   └── index.ts                 # TypeScript definitions
└── public/                      # Static assets
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Quality

The project uses:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Prettier** for code formatting (optional)

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write clear commit messages
- Add comments for complex logic
- Test your changes thoroughly

## 🐛 Known Issues

- [ ] Large texts (>2000 words) may hit API token limits
- [ ] Flashcard generation quality varies with text complexity
- [ ] Mobile keyboard may affect textarea height

## 🔮 Roadmap

### Short Term
- [ ] User authentication with Appwrite Auth
- [ ] Flashcard categories and tags
- [ ] Export to PDF/Anki format
- [ ] Bulk deck operations

### Medium Term
- [ ] Spaced repetition algorithm
- [ ] Collaborative deck sharing
- [ ] Voice narration for accessibility
- [ ] Advanced study analytics

### Long Term
- [ ] Mobile app with React Native
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Integration with popular note-taking apps

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT API
- **Appwrite** for the excellent backend service
- **Vercel** for seamless deployment
- **Tailwind CSS** for the utility-first styling approach
- **Lucide** for the beautiful icons

<div align="center">

</div>
