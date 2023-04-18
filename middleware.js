/*

MIDDLEWARE will offload unnecessary/unauthorized requests right on client side(if it can be done on clientside)
This will decrease load on the server

*/
import { decodeJwt } from 'jose';
import {  NextResponse } from 'next/server';


// This will only run for paths provided in 'matcher' config below, others will be ignored
export async function middleware(req) {
	// HELPER functions
	const pathIs = path => req.nextUrl.pathname.startsWith(path);
	const setPath = path => req.nextUrl.pathname = path;
	const redirect = () => NextResponse.redirect(req.nextUrl); //redirects to given page path, changes url
	const next = () => NextResponse.next(); // Continue and forward req to server, if everything's fine

	// Rewrite, only rewrites content with given path page, url remains unchanged, 
	// better not use on dynamic pages cuz of unexpected behaviour, ok for rewrite to static pages
	// const rewrite = () => NextResponse.rewrite(req.nextUrl); 
	// Unfortunately rewrite doesn;t work as expected, so DITCH?
	
	const jwt = req.cookies.get('accessToken');
	const claims = jwt ? decodeJwt(jwt.value) : null;
	const role = claims ? claims.role : null;


	if(pathIs('/login')){
		if(jwt){
			setPath(`/${role}/dashboard`)
			return redirect()
		}
		return next();
	}


	if (pathIs('/admin')) {
		if (!jwt) {
			setPath('/login');
			return redirect(); // previously rewrite()
		}
		if (req.nextUrl.pathname.includes(role)) {
			return next();
		} else {
			setPath('/logout');
			return redirect();
		}

	}

}

// Middleware is executed only when matching paths are requested
export const config = {
	matcher: [
		'/admin/:path*',
		'/doctor/:path*',
		'/login',
		// might be unnecessary, stackoverflow whether its possible, ie can we contradictarily block and access the same client??
		//'/api/:path*', 
	]
}