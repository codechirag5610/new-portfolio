import './App.scss';
import { About, Footer, Header, Skills, Testimonial, Work } from './containers/index'
import { Navbar } from './components/index'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;
