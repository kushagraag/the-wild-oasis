# The Wild Oasis

Hotel staff needs to keep track of guests coming in and going out along with other details. This application facilitates similar functionality.

An admin access is initially needed to log in. (creds are provided by default)
New users can be created only after login, as in new staff member can be added by admins.

## View live demo at https://the-wild-oasis-sigma-sable.vercel.app/

#### Logged in user can -
- View dashboard with various stats about hotel bookings, stays, expense etc.
- View Cabins
- Add new Cabins
- Edit, delete or duplicate existing cabins
- View bookings and its complete details
- Checkin / checkout a booking
- During checking in, guests need to make payment. Guests also have option to opt in for breakfast, which will be added to final amount if not paid, or pay only for breakfast.
- User can also delete a booking.
- A logged in user can add other new users.
- A settings page is provided to set some minimum/maximum values along application.

### Tech
- Framework -> Vite
- Database -> Supabase
- For deployment -> Vercel

#### Libraries etc.
 - React Query
 - Redux
 - React hot toast
 - React hook forms
 - React icons
 - React router
 - Recharts
