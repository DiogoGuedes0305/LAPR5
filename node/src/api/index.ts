import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import truck from './routes/truckRoute'
import path from './routes/pathRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	truck(app);
	path(app);
	
	return app
}