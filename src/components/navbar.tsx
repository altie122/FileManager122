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
import { ArrowBigUp, MoveDiagonal2, Minus, X, HomeIcon, ComputerIcon } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export function Navbar() {
  let params = useParams();
  const path = params["*"];
  const pathArray = path?.split("/") ?? [];

  const shouldCollapse = pathArray.length >= 7;

  return (
    <div
      data-tauri-drag-region
      className="w-full border-b border-border h-12 flex items-center justify-between gap-4 title-bar-draggable relative"
    >
      {/* Left Controls (traffic light buttons) */}
      <div
        data-tauri-drag-region
        className="flex items-center gap-2 px-2"
      >
        <Button
          variant="unstyled"
          size="icon"
          className="size-3 bg-[#FF5F57] rounded-full text-transparent hover:text-black/70"
          onClick={() => getCurrentWindow().close()}
        >
          <X className="size-2" />
        </Button>
        <Button
          variant="unstyled"
          size="icon"
          className="size-3 bg-[#FFBD2E] rounded-full text-transparent hover:text-black/70"
          onClick={() => getCurrentWindow().minimize()}
        >
          <Minus className="size-2" />
        </Button>
        <Button
          variant="unstyled"
          size="icon"
          className="size-3 bg-[#28C840] rounded-full text-transparent hover:text-black/70"
          onClick={async () => {
            if (await getCurrentWindow().isMaximized()) {
              getCurrentWindow().unmaximize();
            } else {
              getCurrentWindow().maximize();
            }
          }}
        >
          <MoveDiagonal2 className="size-2" />
        </Button>
      </div>

      {/* Centered Breadcrumb area (with Home + Up one level buttons + breadcrumb) */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
        {path ? (
          <>
            <Button variant="outline" size="icon" asChild>
              <Link to={`/`}>
                <HomeIcon className="size-4" />
              </Link>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <Link to={`/files/${pathArray.slice(0, -1).join("/")}`}>
                <ArrowBigUp className="size-4" />
              </Link>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="icon" asChild>
              <Link to={`/files`}>
                <ComputerIcon className="size-4" />
              </Link>
            </Button>
          </>
        )}

        <ContextMenu>
          <ContextMenuTrigger>
            <Breadcrumb className="h-12 flex items-center justify-center flex-row gap-1 border-x px-4 min-w-[500px]">
              <BreadcrumbList data-tauri-drag-region>
                {pathArray.map((item, index) => {
                  // Non-collapsed mode
                  if (!shouldCollapse) {
                    const isLast = index === pathArray.length - 1;
                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{item}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink
                              href={`/files/${pathArray
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

                  // Collapsed mode
                  if (index === 0) {
                    return (
                      <Fragment key={index}>
                        <BreadcrumbItem>
                          <BreadcrumbLink href={`/${item}`}>{item}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </Fragment>
                    );
                  }

                  if (index === 1) {
                    const middle = pathArray.slice(1, -4);
                    return (
                      <Fragment key="ellipsis">
                        <BreadcrumbItem>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-1">
                              <BreadcrumbEllipsis className="size-4" />
                              <span className="sr-only">Toggle menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              {middle.map((m, midIndex) => (
                                <DropdownMenuItem key={midIndex} asChild>
                                  <Link
                                    to={`/files/${pathArray
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

                  if (index > 1 && index < pathArray.length - 4) {
                    return null;
                  }

                  const isLast = index === pathArray.length - 1;
                  return (
                    <Fragment key={index}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>{item}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={`/files/${pathArray
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
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </ContextMenuTrigger>

          <ContextMenuContent>
            <ContextMenuItem onClick={() => navigator.clipboard.writeText(path!)}>
              Copy path
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>

      {/* Right Controls (currently empty) */}
      <div data-tauri-drag-region className="flex items-center gap-4"></div>
    </div>
  );
}