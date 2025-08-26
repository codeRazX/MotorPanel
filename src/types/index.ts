export * from './auth';
export * from './user';
export * from './client';
export * from './employee';
export * from './service';


export const typeGuardErrorBackend = (error: unknown) : error is {errors: {[key: string] : string}} => typeof error === 'object' && error !== undefined && error !== null && 'errors' in error && typeof error.errors === 'object' && error.errors !== null && error.errors !== undefined

