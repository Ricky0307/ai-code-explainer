# AI Code Explainer 🤖

An intelligent web application that uses Google's Gemini AI to explain source code in simple, beginner-friendly language. Perfect for students, coding interview preparation, and understanding legacy code.

![Powered by Gemini AI](https://img.shields.io/badge/Powered%20by-Gemini%20AI-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)

## ✨ Features

- 🔍 **Multi-Language Support** - Analyze code in JavaScript, Python, Java, C++, Go, Rust, TypeScript, and C#
- 📊 **Complexity Analysis** - Get time and space complexity breakdowns in Big O notation
- 💡 **Smart Suggestions** - Receive actionable code improvement recommendations
- ⚡ **Real-time Explanations** - Powered by Google's Gemini 1.5 Flash model
- 🎨 **Modern UI** - Beautiful, responsive interface with dark mode support
- 🚀 **Fast & Efficient** - Built with Next.js 16 and optimized for performance

## 🎯 Use Cases

- **Students** learning programming concepts
- **Interview Preparation** for technical coding interviews
- **Legacy Code** understanding and documentation
- **Teaching Assistance** for instructors and mentors

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd ai-code-explainer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your API key**
   
   Create a `.env.local` file in the project root:
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   
   Replace `your_actual_api_key_here` with your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use

1. **Paste your code** into the editor on the left
2. **Select the programming language** from the dropdown
3. **Click "✨ Explain Code"** button
4. **Review the AI-generated explanation** which includes:
   - 📝 Overview of what the code does
   - ⚙️ Step-by-step logic flow
   - 📊 Time and space complexity analysis
   - 💡 Code improvement suggestions

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Radix UI primitives
- **AI Integration**: Google Generative AI SDK (@google/generative-ai)
- **Notifications**: Sonner toast library

## 📁 Project Structure

```
ai-code-explainer/
├── app/
│   ├── api/
│   │   └── explain/
│   │       └── route.ts          # Gemini API integration
│   ├── layout.tsx                # Root layout with Toaster
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles
├── components/
│   ├── code-editor.tsx           # Code input component
│   ├── explanation-panel.tsx     # Explanation display
│   ├── header.tsx                # App header
│   └── ui/                       # Reusable UI components
├── .env.local                    # Environment variables (create this)
└── package.json
```

## 🔐 API Key Security

- ✅ API keys are stored in `.env.local` (gitignored by default)
- ✅ Keys are only accessible server-side in Next.js API routes
- ✅ Never commit `.env.local` to version control
- ⚠️ Free tier limits: 15 requests/minute, 1500 requests/day

## 🧪 Testing

Try these example codes to test the application:

### JavaScript - Fibonacci
```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### Python - Binary Search
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

## 🐛 Troubleshooting

### "Gemini API key not configured" error
- Ensure `.env.local` exists in the project root
- Verify the API key is correct and not set to `your_api_key_here`
- Restart the development server after creating/modifying `.env.local`

### "API rate limit exceeded" error
- You've hit the free tier limit (15 requests/minute)
- Wait a few moments before trying again
- Consider upgrading your API plan for production use

### Build errors
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Ensure Node.js version is 18 or higher

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add `GEMINI_API_KEY` environment variable in Vercel project settings
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- Google Cloud Run

Remember to set the `GEMINI_API_KEY` environment variable in your deployment platform.

## 📝 License

This project is open source and available for educational purposes.

## 🙏 Acknowledgments

- Powered by [Google Gemini AI](https://ai.google.dev/)
- Built with [Next.js](https://nextjs.org/)
- UI components from [Radix UI](https://www.radix-ui.com/)

---

**Made with ❤️ for students and developers learning to code**
