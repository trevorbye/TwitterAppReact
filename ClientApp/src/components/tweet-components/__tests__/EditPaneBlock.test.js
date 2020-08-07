import React from "react";
import { shallow } from 'enzyme';
import { EditPaneBlock } from '../EditPaneBlock.js';

describe("Edit pane tests", () => {

    it("Edit pane doesn't exist when not expanded.", () => {
        let tweet = { StatusBody: "a test twitter status" };
        const wrapper = shallow(<EditPaneBlock editPaneExpanded={false} tweet={tweet} />);
        expect(wrapper.find("[data-testid='edit-pane']").exists()).toBeFalsy();
    });

    it("When expanded, input val equals tweet status body.", () => {
        let tweet = { StatusBody: "a test twitter status" };
        const wrapper = shallow(<EditPaneBlock editPaneExpanded={true} tweet={tweet} />);
        const input = wrapper.find("textarea")

        expect(input.props().value).toEqual("a test twitter status");
    });

    it("Correct twitter char count.", () => {
        let tweet = { StatusBody: "ooo" };
        const wrapper = shallow(<EditPaneBlock editPaneExpanded={true} tweet={tweet} />);
        const initialVal = wrapper.find("[data-testid='twttr-chars']").text();
        expect(initialVal).toEqual("3 / 280");
    });

    it("Changing input changes twitter char count.", () => {
        let tweet = { StatusBody: "ooo" };
        const wrapper = shallow(<EditPaneBlock editPaneExpanded={true} tweet={tweet} />);
        const input = wrapper.find("textarea")
        input.simulate('change', { target: { value: 'ooooo' } });

        const changedVal = wrapper.find("[data-testid='twttr-chars']").text();
        expect(changedVal).toEqual("5 / 280");
    });
});

