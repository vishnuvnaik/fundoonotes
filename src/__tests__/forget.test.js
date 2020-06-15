import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Forget from "../component/forgetPassword";

configure({ adapter: new Adapter() });
describe("Login Component", () => {
  it("should render without throwing an error", () => {
    expect(shallow(<Forget />).exists()).toBe(true);
  });
  describe("Validate input fields", () => {
    it("input of email", () => {
      const wrapper = shallow(<Forget />);
      wrapper.find("#emailForg").simulate("change", {
        target: { name: "email", value: "vishnuvnaik@hotmail.com" },
      });
      expect(wrapper.state("email")).toEqual("vishnuvnaik@hotmail.com");
    });
    // it("Forgot Button", () => {
    //   const wrapper = shallow(<Forget />);
    //   const decrementBtn = wrapper.find(".styled_component").at(0);
    //   decrementBtn. simulate("click");
    //   expect(true).toBe(true);
    // });
  });
});
describe("Test case for testing login component", () => {
  it("Email Textfield", () => {
    expect(shallow(<Forget />).find("#emailForg").length).toEqual(1);
  });
});
