import type {Metadata} from 'next';import './globals.css';
export const metadata:Metadata={title:'AI Shiksha | Vision Empower Trust',description:'Inclusive AI skilling for educators',openGraph:{title:'AI Shiksha',description:'Learn. Apply. Include.',images:['/social-card.png']}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
