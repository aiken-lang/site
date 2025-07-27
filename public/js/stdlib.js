const LOCAL_STORAGE_KEY = "stdlib.focus";
const FOCUS_CLASSNAME = "focus"
const NAV_BUTTON_SELECTOR = "aside.nextra-sidebar-container div.nx-bottom-0";
const STDLIB_SELECTOR = ".nextra-nav-container > nav > a:nth-child(3) > span";

let it = setInterval(() => {
  const el = document.querySelector(NAV_BUTTON_SELECTOR);
  const stdlib = document.querySelector(STDLIB_SELECTOR);
  if (el && stdlib) {
    clearInterval(it);

    let active = false;
    let focus = localStorage?.getItem(LOCAL_STORAGE_KEY) ?? false;
    if (focus) {
      stdlib.classList.add(FOCUS_CLASSNAME);
    }

    const button = createFocusButton();
    const [ul, li, checkbox] = createFocusPopOver(focus);

    el.insertBefore(button, el.lastChild);

    function hidePopOver() {
      active = false;
      ul.remove();
    }

    function showPopOver() {
      active = true;
      if (focus) {
        li.appendChild(checkbox);
      } else {
        checkbox.remove();
      }
      document.body.appendChild(ul);
    }

    button.addEventListener("click", () => {
      if (active) {
        return hidePopOver();
      }

      showPopOver();

      // Disable the stdlib animation on demand. The 'setTimeout' is
      // necessary to prevent the 'click' event on the button to instantly
      // bubble onto this new handler.
      setTimeout(() => {
        window.addEventListener("click", function focusHandler(event) {
          // Avoid leaking handlers on each click.
          window.removeEventListener("click", focusHandler);
          // Only toggle the flag if the click was on the pop-over content.
          if (event.target === li || event.target === checkbox || event.target === checkbox.lastChild) {
            focus = !focus;
            if (focus) {
              stdlib.classList.add(FOCUS_CLASSNAME);
              localStorage?.setItem(LOCAL_STORAGE_KEY, true);
            } else {
              stdlib.classList.remove(FOCUS_CLASSNAME);
              localStorage?.removeItem(LOCAL_STORAGE_KEY);
            }
          }
          // Reset the button pop-over and hide the pop-over.
          hidePopOver();
        });
      }, 0);
    });
  }
}, 50);

function createFocusButton() {
  const button = document.createElement("button");
  button.classList = "nx-h-7 nx-rounded-md nx-px-2  nx-text-gray-600 nx-transition-colors dark:nx-text-gray-400 hover:nx-bg-gray-100 hover:nx-text-gray-900 dark:hover:nx-bg-primary-100/5 dark:hover:nx-text-gray-50";
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-crosshair"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>`;
  return button;
}

function createFocusPopOver() {
  const ul = document.createElement("ul");
  // id="headlessui-listbox-options-:ra:"
  ul.classList = `"nx-z-20 nx-max-h-64 nx-overflow-auto nx-rounded-md nx-ring-1 nx-ring-black/5 nx-bg-white nx-py-1 nx-text-sm nx-shadow-lg dark:nx-ring-white/20 dark:nx-bg-neutral-800`;
  ul.setAttribute("aria-orientation", "vertical");
  ul.setAttribute("role", "listbox");
  ul.setAttribute("tabindex", "0");
  ul.setAttribute("data-headlessui-state", "open")
  ul.style.position = "fixed";
  ul.style.inset = "auto auto 0px 0px";
  ul.style.margin = "0px";
  ul.style.transform = "translate3d(210px, -54.5px, 0px)";
  ul.style["min-width"] = "28px";
  ul.style["data-popper-placement"] = "top-start";

  const li = document.createElement("li");
  li.classList = `nx-text-gray-800 dark:nx-text-gray-100 nx-relative nx-cursor-pointer nx-whitespace-nowrap nx-py-1.5 nx-transition-colors ltr:nx-pl-3 ltr:nx-pr-9 rtl:nx-pr-3 rtl:nx-pl-9`;
  li.setAttribute("role", "option");
  li.setAttribute("tabindex", -1);
  li.setAttribute("aria-selected", false);
  li.innerText = "Focus mode";

  const checkbox = document.createElement("span");
  checkbox.classList = `nx-absolute nx-inset-y-0 nx-flex nx-items-center ltr:nx-right-3 rtl:nx-left-3`;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttributeNS(null, "viewBox", "0 0 20 20");
  svg.setAttributeNS(null, "width", "1em");
  svg.setAttributeNS(null, "height", "1em");
  svg.setAttributeNS(null, "fill", "currentColor");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttributeNS(null, "fill-rule", "evenodd");
  path.setAttributeNS(null, "clip-rule", "evenodd");
  path.setAttributeNS(null, "d", "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z");
  svg.appendChild(path);
  checkbox.appendChild(svg);

  ul.appendChild(li);

  return [ul, li, checkbox];
}
