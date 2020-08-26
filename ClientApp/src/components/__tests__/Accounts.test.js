import React from "react";
import { shallow, mount } from 'enzyme';
import { Account } from '../Account';

describe("Tests for account portal.", () => {

    it("Waiting for accounts shows waiting div", () => {
        const wrapper = shallow(<Account />);
        expect(wrapper.text()).toContain("Loading twitter accounts...");
    });

    it("Single twitter handle shows up on page.", () => {
        let handles = [
            {
                TwitterHandle: "@TestHandle"
            }
        ];
        const wrapper = mount(<Account />);
        wrapper.setState({
            isLoadingHandles: false,
            handles: handles
        });

        expect(wrapper.text()).toContain("@TestHandle");
    });

    it("Multiple twitter handles show up on page.", () => {
        let handles = [
            {
                TwitterHandle: "@TestHandle"
            },
            {
                TwitterHandle: "@TestHandle2"
            },
            {
                TwitterHandle: "@TestHandle3"
            }
        ];
        const wrapper = mount(<Account />);
        wrapper.setState({
            isLoadingHandles: false,
            handles: handles
        });

        expect(wrapper.text()).toContain("@TestHandle");
        expect(wrapper.text()).toContain("@TestHandle2");
        expect(wrapper.text()).toContain("@TestHandle3");
    });

    it("Expanding settings shows attributes", () => {
        let handles = [
            {
                TwitterHandle: "@TestHandle"
            }
        ];

        // manually append tooltip divs to DOM otherwise enzyme can't find them
        // https://github.com/reactstrap/reactstrap/issues/773
        const tooltipDiv = document.createElement("div");
        const innerToolTipDiv = document.createElement("div");
        tooltipDiv.setAttribute("id", "retweet-tip");
        innerToolTipDiv.setAttribute("id", "private-tooltip");

        tooltipDiv.appendChild(innerToolTipDiv);
        document.body.appendChild(tooltipDiv);
        
        const wrapper = mount(<Account />, {attachTo: innerToolTipDiv});
        wrapper.setState({
            isLoadingHandles: false,
            handles: handles
        });
        wrapper.find("[data-testid='expand-account-settings']").simulate("click");

        expect(wrapper.text()).toContain("Delete account");
        expect(wrapper.text()).toContain("Private account");
    });

});