import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { WebjobPostedBlock } from '../WebjobPostedBlock.js';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Webjob section doesn't render during editing, and renders correctly when posted by webjob.", () => {
    act(() => {
        let tweet = { IsPostedByWebJob: true };
        render(<WebjobPostedBlock tweet={tweet} editPaneExpanded={false} />, container);
    });

    expect(container.querySelector("[data-testid='webjob-pane']")).toBeDefined();

    act(() => {
        let tweet = { IsPostedByWebJob: true };
        render(<WebjobPostedBlock tweet={tweet} editPaneExpanded={true} />, container);
    });

    expect(container.querySelector("[data-testid='webjob-pane']")).toBeNull();

    act(() => {
        let tweet = { IsPostedByWebJob: false };
        render(<WebjobPostedBlock tweet={tweet} editPaneExpanded={true} />, container);
    });

    expect(container.querySelector("[data-testid='webjob-pane']")).toBeNull();
});