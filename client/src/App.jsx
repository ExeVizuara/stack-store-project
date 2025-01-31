import { useState, useEffect } from "react";
import { MainContent } from "./components/shared/MainContent";
import { MobileMain } from "./components/shared/MobileMain";
import { Sidebar } from "./components/shared/Sidebar";
import { useSearchContext } from "./components/providers/SearchProvider";
import { Login } from "./components/controller/Login";
import { checkToken } from "./services/authService";
import { useAuthContext } from "./components/providers/AuthProvider";

function App() {
  const { search, setSearchProducts } = useSearchContext();
  const { isAuthenticated, setIsAuthenticated } = useAuthContext();
  const { setCurrentCategory } = useSearchContext();
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const verifyAuth = async () => {
    try {
      const tokenValid = await checkToken();
      if (tokenValid) {
        setIsAuthenticated(true); 
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error verificando el token:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAuth();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    console.log(showMenu);
  };

  const [currentPage, setCurrentPage] = useState('Home');
  const [activedCats, setActivedCats] = useState({
    Home: true,
    Ventas: false,
    Control: false,
    Usuarios: false,
    Configuracion: false,
    Logout: false
  });

  const selectedOption = (option) => {
    setCurrentPage(option);
    setActivedCats({
      Home: option === 'Home',
      Ventas: option === 'Ventas',
      Control: option === 'Control',
      Usuarios: option === 'Usuarios',
      Configuracion: option === 'Configuracion',
      Logout: option === 'Logout'
    });
    setCurrentCategory('Almacen');
    console.log(option);
    setShowMenu(!showMenu);
  };

  const handleOutSide = () => {
    !search && setSearchProducts(false);
  };

  if (isLoading) {
    return <div className="loading-screen">Cargando...</div>;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="w-full h-full bg-[#333332d2]" onClick={handleOutSide}>
          <Sidebar 
            showMenu={showMenu}
            onItemClick={selectedOption}
            activatedCats={currentPage}
          />
          <MobileMain onItemClick={toggleMenu} showMenu={showMenu} />
          <MainContent selectedCat={currentPage} />
        </div>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;