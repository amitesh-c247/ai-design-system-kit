import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { Form } from "react-bootstrap";
import FormComponent from "./index";

export default {
  title: "Components/Form",
  component: FormComponent,
  argTypes: {
    validated: {
      control: "boolean",
    },
  },
} as Meta<typeof FormComponent>;

const Template: StoryFn<typeof FormComponent> = (args) => (
  <FormComponent {...args}>
    <FormComponent.Item label="Username" required>
      <Form.Control type="text" placeholder="Enter username" />
    </FormComponent.Item>
    <FormComponent.Item label="Password" required>
      <Form.Control type="password" placeholder="Enter password" />
    </FormComponent.Item>
  </FormComponent>
);

export const Basic = Template.bind({});
Basic.args = {
  validated: false,
};

export const Horizontal = () => (
  <FormComponent>
    <FormComponent.HorizontalGroup
      label="Username"
      control={<Form.Control type="text" placeholder="Enter username" />}
    />
    <FormComponent.HorizontalGroup
      label="Password"
      control={<Form.Control type="password" placeholder="Enter password" />}
    />
  </FormComponent>
);

export const WithValidation = () => (
  <FormComponent>
    <FormComponent.Item
      label="Email"
      required
      help="Please enter a valid email address"
      validateStatus="error"
    >
      <Form.Control type="email" placeholder="Enter email" />
    </FormComponent.Item>
    <FormComponent.Item
      label="Password"
      required
      help="Password must be at least 8 characters"
      validateStatus="warning"
    >
      <Form.Control type="password" placeholder="Enter password" />
    </FormComponent.Item>
  </FormComponent>
);

export const FormList = () => (
  <FormComponent>
    <FormComponent.List name="users">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field, index) => (
            <FormComponent.Item
              key={field.key}
              label={`User ${index + 1}`}
              dense={index > 0}
            >
              <div className="d-flex gap-2">
                <Form.Control type="text" placeholder="Enter name" />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </FormComponent.Item>
          ))}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => add()}
          >
            Add User
          </button>
        </>
      )}
    </FormComponent.List>
  </FormComponent>
);
