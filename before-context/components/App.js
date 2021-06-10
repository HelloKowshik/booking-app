import '../App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa';
import UserPicker from './Users/UserPicker';
import BookablesPage from './Bookables/BookablesPage';
import UsersPage from './Users/UsersPage';
import BookingsPage from './Bookings/BookingsPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <header>
          <nav>
            <ul>
              <li>
                <Link to='/bookings' className='btn btn-header'>
                  <FaCalendarAlt />
                  <span>Bookings</span>
                </Link>
              </li>
              <li>
                <Link to='/bookables' className='btn btn-header'>
                  <FaDoorOpen />
                  <span>Bookables</span>
                </Link>
              </li>
              <li>
                <Link to='/users' className='btn btn-header'>
                  <FaUsers />
                  <span>Users</span>
                </Link>
              </li>
            </ul>
          </nav>
          <UserPicker />
        </header>
        <Switch>
          <Route path='/bookings' component={BookingsPage} />
          <Route path='/bookables' component={BookablesPage} />
          <Route path='/users' component={UsersPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
