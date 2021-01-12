import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { WebjobPostedBlock } from '../WebjobPostedBlock.js';
import { mount } from 'enzyme';

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
        render(<WebjobPostedBlock tweet={tweet} editPaneExpanded={false} canEdit={true} />, container);
    });

    expect(container.querySelector("[data-testid='webjob-pane']")).toBeDefined();

    act(() => {
        let tweet = { IsPostedByWebJob: true };
        render(<WebjobPostedBlock tweet={tweet} editPaneExpanded={true} canEdit={true} />, container);
    });

    expect(container.querySelector("[data-testid='webjob-pane']")).toBeNull();

    act(() => {
        let tweet = { IsPostedByWebJob: false };
        render(<WebjobPostedBlock tweet={tweet} editPaneExpanded={true} canEdit={true} />, container);
    });

    expect(container.querySelector("[data-testid='webjob-pane']")).toBeNull();
});

describe("WebJobPostedBlock - Twitter Icon", () => {

    // 3 States:
    // Posted without external twitter id - older tweets - not enabled
    // Posted with external twitter id - newer tweets - enabled
    // Tweets not posted yet do not show icon

    it("Twitter icon area displays correctly with button enabled", () => {

        // posted tweet with tweetId is enabled
        let tweet = {
            IsPostedByWebJob: true,
            Id: 123,
            TweetId: "XYZ"
        };

        const myComponent = mount(<WebjobPostedBlock tweet={tweet} editPaneExpanded={false} canEdit={false} />);

        const myButton = myComponent.find("[data-testid='button']");
        expect(myButton).toBeDefined();
        expect(myButton.prop('disabled')).toBe(false);
    });
    it("Twitter icon area displays correctly with button disabled", () => {

        // posted tweet without tweetId is NOT enabled
        let tweet = {
            IsPostedByWebJob: true,
            Id: 123,
            TweetId: null
        };

        const myComponent = mount(<WebjobPostedBlock tweet={tweet} editPaneExpanded={false} canEdit={false} />);

        const myButton = myComponent.find("[data-testid='button']");
        expect(myButton).toBeDefined();
        expect(myButton.prop('disabled')).toBe(true);
    });

    it("Twitter icon area displays correctly without button b/c tweet isn't posted", () => {
        let tweet = {
            IsPostedByWebJob: false,
            Id: 123,
            TweetId: ""
        };
        const myComponent = mount(<WebjobPostedBlock tweet={tweet} editPaneExpanded={false} canEdit={false} />);

        const myButton = myComponent.find("[data-testid='button']");
        expect(myButton).toEqual({});;
    });

});