export type PostFilterOptions = {
    buttonAttr: string;
    cardAttr: string;
    summaryId: string;
    noun: string;
    matchMode: "includes" | "equals";
};

export function initPostFilter(options: PostFilterOptions): void {
    const summary = document.getElementById(options.summaryId);
    const buttons = Array.from(document.querySelectorAll<HTMLButtonElement>(`[${options.buttonAttr}]`));
    const cards = Array.from(document.querySelectorAll<HTMLElement>(`[${options.cardAttr}]`));

    const setActiveButton = (active: string): void => {
        buttons.forEach((button) => {
            button.setAttribute("aria-pressed", String(button.getAttribute(options.buttonAttr) === active));
        });
    };

    const applyFilter = (active: string): void => {
        let visibleCount = 0;

        cards.forEach((card) => {
            const raw = card.getAttribute(options.cardAttr) ?? "";
            const matched =
                active === "all" ||
                (options.matchMode === "includes"
                    ? raw.split(",").filter(Boolean).includes(active)
                    : raw === active);

            card.hidden = !matched;
            if (matched) {
                visibleCount += 1;
            }
        });

        if (summary) {
            summary.textContent =
                active === "all"
                    ? `共 ${cards.length} 篇文章`
                    : `当前${options.noun}：${active}，共 ${visibleCount} 篇`;
        }

        setActiveButton(active);
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            applyFilter(button.getAttribute(options.buttonAttr) ?? "all");
        });
    });

    applyFilter("all");
}
