import { execSync } from 'child_process';
export default function setup() {
	execSync('pnpm supabase:seed');
}
