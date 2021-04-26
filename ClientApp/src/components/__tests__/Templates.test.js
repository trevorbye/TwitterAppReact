import React from "react";
import { shallow, mount } from 'enzyme';
import { Compose } from '../Compose';

describe("Templates", () => {

    it("Empty body shows 0 char count", () => {
        const wrapper = shallow(<Compose />);
        expect(wrapper.text()).toContain("0 / 280");
    });

    it("Changing body changes char count.", () => {
        const wrapper = shallow(<Compose />);
        const input = wrapper.find("textarea")
        input.simulate('change', { target: { value: 'test tweet' } });

        expect(wrapper.text()).toContain("10 / 280");
    });
    /*
    it("Handles populate dropdown.", () => {
        let handles = ["", "@testHandle", "@testHandle2"];

        const wrapper = shallow(<Compose />);
        wrapper.setState({
            globalHandles: handles,
            selectedHandle: handles[0]
        });

        
        expect(wrapper.find("option").at(1)).toContain("@testHandle");
        expect(wrapper.find("option").at(1)).toContain("@testHandle2");
    });
    */
    
});