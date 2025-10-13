import Footer from "./components/Footer"
import Header from "./components/Header"

function App() {
  return (
  <div className="min-h-screen flex flex-col car-gradient">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-4xl font-heading font-bold text-auto-gray-800 mb-4">
            Добро пожаловать в AutoPremium
          </h2>
          <p className="text-auto-gray-600 text-lg max-w-2xl mx-auto">
            Откройте для себя мир премиальных запчастей. 
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
