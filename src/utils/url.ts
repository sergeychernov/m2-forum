export function isAbsoluteHttpUrl(src?: string): boolean {
	return !!src && /^(https?:)\/\//i.test(src);
}

export function buildPublicUrlPath(path?: string): string {
	const publicUrl = process.env.PUBLIC_URL || '';
	if (!path) return publicUrl;
	return isAbsoluteHttpUrl(path) ? path : `${publicUrl}${path}`;
}


