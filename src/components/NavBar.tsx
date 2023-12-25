"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  ArrowBigDownIcon,
  Code2Icon,
  GithubIcon,
  LinkedinIcon,
  LogInIcon,
} from "lucide-react";
import UserSessionNavBar from "./form/UserSessionNavBar";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Rendering Statico",
    href: "/staticRendering",
    description:
      "Recupera e memorizza dati nella cache durante la fase di compilazione per ottimizzare le prestazioni.",
  },
  {
    title: "Rendering Dinamico",
    href: "/dynamicRendering",
    description:
      "Effettua la pulizia della cache per garantire aggiornamenti dinamici e gestire correttamente le risorse.",
  },
  {
    title: "Rigenerazione incrementale statica",
    href: "/ISR",
    description:
      " Questa pagina utilizza la rigenerazione statica incrementale. Un'immagine nuova viene recuperata ogni 15 secondi (dopo aver aggiornato la pagina) e viene quindi servita dalla cache per quella durata.",
  },
  {
    title: "generateStaticParams()",
    href: "/topics/men",
    description:
      " Questa pagina utilizza generateStaticParams per renderizzare e memorizzare in cache pagine statiche al momento della compilazione",
  },
  {
    title: "Database Prisma SQL",
    href: "https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql",
    description:
      "Guida dettagliata su come configurare e utilizzare Prisma per interagire con database SQL nelle applicazioni Next.js.",
  },
  {
    title: "Autenticazione con next-auth",
    href: "https://next-auth.js.org/getting-started/introduction",
    description:
      "Implementa in modo sicuro l'autenticazione nei tuoi progetti Next.js utilizzando next-auth.",
  },
];

export function NavBar() {
  return (
    <NavigationMenu id="menu">
      <NavigationMenuList>
        <NavigationMenuItem>
          {" "}
          <Link href="/" className="text-xl">
            NEXT.JS 🇮🇹
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="lg:text-lg ml-10">
            NextJS Topics
          </NavigationMenuTrigger>
          <NavigationMenuContent className="d-flex justify-center items-center">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:gap-9 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="https://nextjs.org"
                    target="_blank"
                  >
                    <Code2Icon />
                    <div className="mb-2 mt-4 text-2xl font-bold">
                      Next JS 14
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Framework React per lo sviluppo di applicazioni web
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Benvenuto su - Next.js documentation!
              </ListItem>
              <div className="d-flex justify-around">
                <ListItem
                  title="GitHub"
                  className="d-flex flex-col justify-center items-center"
                >
                  <Link href="https://github.com/lucaf1990" target="_blank">
                    <GithubIcon />
                  </Link>
                </ListItem>
                <ListItem
                  title="LinkedIn"
                  className="d-flex flex-col justify-center items-center"
                >
                  <Link
                    href="https://www.linkedin.com/in/luca-forma-987024270/"
                    target="_blank"
                  >
                    <LinkedinIcon />
                  </Link>
                </ListItem>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="lg:text-lg ml-10 mr-10 ">
            Main Topics
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[600px]  md:grid-cols-2 lg:w-[800px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className="hover:animate-pulse ">
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
