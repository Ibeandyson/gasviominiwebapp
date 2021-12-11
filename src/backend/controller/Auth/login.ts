import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from "../../../../lib/mongodb";
import validateLoginInput from '../../Validation/login'
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// Form validation
	const { errors, isValid } = validateLoginInput(req.body.data);

	// Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;
	try {
		let { db } = await connectToDatabase();
		let user = await db.collection('customer').find({ email })
		const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
		if (!user) {
			return res.status(404).json({ emailnotfound: 'Email or User name not found ' });
		} else {
			bcrypt.compare(password, user.password).then(isMatch => {
				if (isMatch) {
					// Create JWT Payload
					const payload = {
						id: user.id,
						username: user.username
					};
					// Sign token
					jwt.sign(
						payload,
						keys.secretOrKey,
						{
							expiresIn: 3600 // 1 hour in seconds
						},
						(err, token) => {
							res.status(200).json({
								id: user.id,
								username: user.username,
								first_name: user.first_name,
								last_name: user.last_name,
								state: user.state,
								address: user.address,
								phone: user.phone,
								avatar: user.avatar,
								success: true,
								token: 'Bearer ' + token
							});
						}
					);
				} else {
					return res.status(400).json({ passwordincorrect: 'Password incorrect' });
				}
			});
		}

	} catch (error: any) {
		return res.status(500).json({
			message: new Error(error).message,
			success: false,
		});
	}

}