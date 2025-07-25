import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ImageWithFallback from "./index";

const meta: Meta<typeof ImageWithFallback> = {
  title: "Components/Display/ImageWithFallback",
  component: ImageWithFallback,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    fallback: {
      control: "text",
      description: "Fallback image URL when main image fails to load",
    },
    alt: {
      control: "text",
      description: "Alternative text for accessibility",
    },
    width: {
      control: "number",
      description: "Image width",
    },
    height: {
      control: "number",
      description: "Image height",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    objectFit: {
      control: "select",
      options: ["contain", "cover", "fill", "none", "scale-down"],
      description: "CSS object-fit property",
    },
    loading: {
      control: "select",
      options: ["lazy", "eager"],
      description: "Image loading strategy",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "An image component that gracefully handles loading errors with fallback images.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://via.placeholder.com/300x200/0066cc/ffffff?text=Main+Image",
    fallback:
      "https://via.placeholder.com/300x200/cccccc/666666?text=Fallback+Image",
    alt: "Example image",
    width: 300,
    height: 200,
  },
};

export const SuccessfulLoad: Story = {
  args: {
    src: "https://via.placeholder.com/400x300/28a745/ffffff?text=Successfully+Loaded",
    fallback: "https://via.placeholder.com/400x300/dc3545/ffffff?text=Fallback",
    alt: "Successfully loaded image",
    width: 400,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story: "Image that loads successfully from the primary source.",
      },
    },
  },
};

export const FallbackScenario: Story = {
  args: {
    src: "https://broken-url-that-will-fail.com/image.jpg",
    fallback:
      "https://via.placeholder.com/400x300/ffc107/000000?text=Fallback+Image+Loaded",
    alt: "Fallback image example",
    width: 400,
    height: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates fallback behavior when the primary image fails to load.",
      },
    },
  },
};

export const ProfilePictures: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-center flex-wrap">
      <div className="text-center">
        <ImageWithFallback
          src="https://via.placeholder.com/80x80/007bff/ffffff?text=JD"
          fallback="https://via.placeholder.com/80x80/6c757d/ffffff?text=?"
          alt="John Doe"
          width={80}
          height={80}
          className="rounded-circle"
        />
        <div className="mt-2 small">John Doe</div>
      </div>

      <div className="text-center">
        <ImageWithFallback
          src="https://broken-url.com/jane.jpg"
          fallback="https://via.placeholder.com/80x80/6c757d/ffffff?text=JS"
          alt="Jane Smith"
          width={80}
          height={80}
          className="rounded-circle"
        />
        <div className="mt-2 small">Jane Smith (Fallback)</div>
      </div>

      <div className="text-center">
        <ImageWithFallback
          src="https://via.placeholder.com/80x80/28a745/ffffff?text=AB"
          fallback="https://via.placeholder.com/80x80/6c757d/ffffff?text=?"
          alt="Alice Brown"
          width={80}
          height={80}
          className="rounded-circle"
        />
        <div className="mt-2 small">Alice Brown</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Profile picture use case with circular images and fallbacks.",
      },
    },
  },
};

export const ProductImages: Story = {
  render: () => (
    <div className="row g-3">
      <div className="col-md-4">
        <div className="card">
          <ImageWithFallback
            src="https://via.placeholder.com/300x200/007bff/ffffff?text=Product+1"
            fallback="https://via.placeholder.com/300x200/6c757d/ffffff?text=No+Image"
            alt="Product 1"
            width={300}
            height={200}
            className="card-img-top"
            objectFit="cover"
          />
          <div className="card-body">
            <h6 className="card-title">Product 1</h6>
            <p className="card-text">Product description here.</p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card">
          <ImageWithFallback
            src="https://broken-url.com/product2.jpg"
            fallback="https://via.placeholder.com/300x200/6c757d/ffffff?text=No+Image"
            alt="Product 2"
            width={300}
            height={200}
            className="card-img-top"
            objectFit="cover"
          />
          <div className="card-body">
            <h6 className="card-title">Product 2 (Fallback)</h6>
            <p className="card-text">Product with failed image load.</p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card">
          <ImageWithFallback
            src="https://via.placeholder.com/300x200/28a745/ffffff?text=Product+3"
            fallback="https://via.placeholder.com/300x200/6c757d/ffffff?text=No+Image"
            alt="Product 3"
            width={300}
            height={200}
            className="card-img-top"
            objectFit="cover"
          />
          <div className="card-body">
            <h6 className="card-title">Product 3</h6>
            <p className="card-text">Another product description.</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Product catalog use case with card layouts and consistent fallbacks.",
      },
    },
  },
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="d-flex gap-3 align-items-end flex-wrap">
      <div className="text-center">
        <ImageWithFallback
          src="https://via.placeholder.com/50x50/007bff/ffffff?text=50x50"
          fallback="https://via.placeholder.com/50x50/6c757d/ffffff?text=?"
          alt="Small image"
          width={50}
          height={50}
          className="rounded"
        />
        <div className="mt-1 small">50x50</div>
      </div>

      <div className="text-center">
        <ImageWithFallback
          src="https://via.placeholder.com/100x100/28a745/ffffff?text=100x100"
          fallback="https://via.placeholder.com/100x100/6c757d/ffffff?text=?"
          alt="Medium image"
          width={100}
          height={100}
          className="rounded"
        />
        <div className="mt-1 small">100x100</div>
      </div>

      <div className="text-center">
        <ImageWithFallback
          src="https://broken-url.com/large.jpg"
          fallback="https://via.placeholder.com/150x150/6c757d/ffffff?text=Fallback"
          alt="Large image"
          width={150}
          height={150}
          className="rounded"
        />
        <div className="mt-1 small">150x150 (Fallback)</div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Images in different sizes demonstrating scalability.",
      },
    },
  },
};

export const ObjectFitExamples: Story = {
  render: () => (
    <div className="row g-3">
      <div className="col-md-6">
        <h6>Cover (default)</h6>
        <ImageWithFallback
          src="https://via.placeholder.com/400x200/007bff/ffffff?text=Wide+Image"
          fallback="https://via.placeholder.com/300x300/6c757d/ffffff?text=Fallback"
          alt="Cover example"
          width={300}
          height={300}
          objectFit="cover"
          className="border"
        />
      </div>

      <div className="col-md-6">
        <h6>Contain</h6>
        <ImageWithFallback
          src="https://via.placeholder.com/400x200/28a745/ffffff?text=Wide+Image"
          fallback="https://via.placeholder.com/300x300/6c757d/ffffff?text=Fallback"
          alt="Contain example"
          width={300}
          height={300}
          objectFit="contain"
          className="border"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different object-fit behaviors for handling aspect ratio mismatches.",
      },
    },
  },
};

export const LazyLoading: Story = {
  render: () => (
    <div className="d-flex flex-column gap-3">
      <div>
        <h6>Eager Loading (loads immediately)</h6>
        <ImageWithFallback
          src="https://via.placeholder.com/400x200/007bff/ffffff?text=Eager+Loading"
          fallback="https://via.placeholder.com/400x200/6c757d/ffffff?text=Fallback"
          alt="Eager loading example"
          width={400}
          height={200}
          loading="eager"
          className="border"
        />
      </div>

      <div>
        <h6>Lazy Loading (loads when in viewport)</h6>
        <ImageWithFallback
          src="https://via.placeholder.com/400x200/28a745/ffffff?text=Lazy+Loading"
          fallback="https://via.placeholder.com/400x200/6c757d/ffffff?text=Fallback"
          alt="Lazy loading example"
          width={400}
          height={200}
          loading="lazy"
          className="border"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different loading strategies for performance optimization.",
      },
    },
  },
};
