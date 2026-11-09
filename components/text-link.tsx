import Link from "next/link";
export function TextLink({href,children,external=false,className=""}:{href:string;children:React.ReactNode;external?:boolean;className?:string}){
 const content=<><span>{children}</span><span aria-hidden="true">↗</span></>;
 return external ? <a href={href} target="_blank" rel="noopener noreferrer" className={`editorial-link ${className}`}>{content}</a> : <Link href={href} className={`editorial-link ${className}`}>{content}</Link>;
}
