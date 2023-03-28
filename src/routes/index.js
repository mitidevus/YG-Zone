// Pages
import Library from '~/pages/Library';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import SearchResult from '~/pages/SearchResult';
import CardInfo from '~/pages/CardInfo';
import Packs from '~/pages/Packs';
import GachaPacks from '~/pages/GachaPacks';
import Gacha from '~/pages/Gacha';

// Public Routes
const publicRoutes = [
    { path: '/', component: Library },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
    { path: '/cards/:type?/:fname', component: SearchResult },
    { path: '/cardinfo/:name', component: CardInfo },
    { path: '/packs', component: Packs },
    { path: '/packs/gacha', component: GachaPacks },
    { path: '/packs/gacha/:name', component: Gacha },

];

const privateRoutes = [{ }];

export { publicRoutes, privateRoutes };
