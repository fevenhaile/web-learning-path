import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth';// Adjust the path to where your auth.ts file is located

export default NextAuth(authOptions);
