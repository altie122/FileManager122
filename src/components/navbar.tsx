import { Link, useParams } from "react-router";
import { Fragment } from "react/jsx-runtime";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbEllipsis,
} from "./ui/breadcrumb";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ArrowBigUp, MoveDiagonal2, Minus, X } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function Navbar() {
  let params = useParams();
  const path = params["*"];
  const pathArray = path?.split("/") ?? [];

  const shouldCollapse = pathArray.length >= 7;

  return (
    <div
      data-tauri-drag-region
      className='w-full border-b border-border h-12 flex items-center justify-between gap-4 title-bar-draggable'
    >
      <div
        data-tauri-drag-region
        className='flex items-center gap-2 md:basis-1/4 lg:basis-1/3 px-2'
      >
        <Button
          variant='unstyled'
          size='icon'
          className='size-3 bg-[#FF5F57] rounded-full text-transparent hover:text-black/70'
          onClick={() => getCurrentWindow().close()}
        >
          <X className='size-2' />
        </Button>
        <Button
          variant='unstyled'
          size='icon'
          className='size-3 bg-[#FFBD2E] rounded-full text-transparent hover:text-black/70'
          onClick={() => getCurrentWindow().minimize()}
        >
          <Minus className='size-2' />
        </Button>
        <Button
          variant='unstyled'
          size='icon'
          className='size-3 bg-[#28C840] rounded-full text-transparent hover:text-black/70'
          onClick={async () => {
            if (await getCurrentWindow().isMaximized()) {
              getCurrentWindow().unmaximize();
            } else {
              getCurrentWindow().maximize();
            }
          }}
        >
          <MoveDiagonal2 className='size-2' />
        </Button>
      </div>
      <div
        data-tauri-drag-region
        className='flex items-center gap-4 md:basis-1/2 lg:basis-1/3'
      >
        <Button variant='outline' size='icon' asChild>
          <Link to={`/${pathArray.slice(0, -1).join("/")}`}>
            <ArrowBigUp className='size-4' />
          </Link>
        </Button>
        <ContextMenu>
          <ContextMenuTrigger>
            <Breadcrumb className='h-12 flex items-center justify-center flex-row gap-1 border-x px-4 min-w-[500px]'>
              <BreadcrumbList>
                {pathArray.map((item, index) => {
                  // If not collapsing, render everything normally
                  if (!shouldCollapse) {
                    const isLast = index === pathArray.length - 1;
                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{item}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={`/${pathArray
                                .slice(0, index + 1)
                                .join("/")}`}
                            >
                              {item}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </Fragment>
                    );
                  }

                  // --- Collapsed mode ---
                  // First item
                  if (index === 0) {
                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          <BreadcrumbLink href={`/${item}`}>
                            {item}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </Fragment>
                    );
                  }

                  // Ellipsis dropdown (inserted once after first item)
                  if (index === 1) {
                    const middle = pathArray.slice(1, -4); // everything between first and 4th-to-last
                    return (
                      <Fragment key='ellipsis'>
                        <BreadcrumbItem>
                          <DropdownMenu>
                            <DropdownMenuTrigger className='flex items-center gap-1'>
                              <BreadcrumbEllipsis className='size-4' />
                              <span className='sr-only'>Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='start'>
                              {middle.map((m, midIndex) => (
                                <DropdownMenuItem key={midIndex} asChild>
                                  <Link
                                    to={`/${pathArray
                                      .slice(0, midIndex + 2)
                                      .join("/")}`}
                                  >
                                    {m}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </Fragment>
                    );
                  }

                  // Skip rendering middle items (they're in dropdown)
                  if (index > 1 && index < pathArray.length - 4) {
                    return null;
                  }

                  // Last 4 items
                  const isLast = index === pathArray.length - 1;
                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{item}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={`/${pathArray.slice(0, index + 1).join("/")}`}
                          >
                            {item}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </ContextMenuTrigger>

          <ContextMenuContent>
            <ContextMenuItem
              onClick={() => navigator.clipboard.writeText(path!)}
            >
              Copy path
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
      <div
        data-tauri-drag-region
        className='flex items-center gap-4 md:basis-1/4 lg:basis-1/3'
      ></div>
    </div>
  );
}
