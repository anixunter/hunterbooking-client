import "./Home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by hotel type</h1>
        <PropertyList />
        <h1 className="homeTitle">Hotels guests love</h1>
        <FeaturedProperties />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
