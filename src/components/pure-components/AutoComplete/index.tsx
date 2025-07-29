import React, { useEffect, useState, useRef } from "react";
import { Form, InputGroup, Dropdown } from "react-bootstrap";
import { UseQueryResult } from "@tanstack/react-query";
import { Search } from "lucide-react";
import highlightText from "@/types/utils/highlight";
import type { AutoCompleteOption, AutoCompleteProps } from "./types";

const AutoComplete: React.FC<AutoCompleteProps> = ({
  queryFn,
  value,
  onChange,
  onSearch,
  additionalFilters = {},
  placeholder,
  footer,
  className = "",
  ...props
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: { content: entities = [] } = {} } = queryFn
    ? queryFn({
        page: 0,
        searchValue,
        size: 10,
        ...additionalFilters,
      })
    : { data: { content: [] } };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSelect = (option: AutoCompleteOption) => {
    const stringValue =
      typeof option.value === "string"
        ? option.value
        : entities.find((item: any) => item.id === option.key)?.name;

    onChange?.({ key: option.key, value: stringValue });
    setSearchValue("");
    setShowDropdown(false);
  };

  useEffect(() => {
    setSearchValue(value?.value?.toString() || "");
  }, [value]);

  const options = entities
    .map((entity: any) => ({
      key: entity.id,
      value: highlightText(entity.name, searchValue ?? ""),
    }))
    .filter((item: AutoCompleteOption) => value?.key !== String(item.key));

  const handleSearch = (value: string) => {
    onSearch?.(value);
    setSearchValue(value);
    setShowDropdown(true);
  };

  return (
    <div className={`position-relative ${className}`} ref={dropdownRef}>
      <InputGroup>
        <Form.Control
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            setSearchValue("");
            setShowDropdown(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setSearchValue(value?.value?.toString() || "");
            }, 200);
          }}
          {...props}
        />
        <InputGroup.Text>
          <Search size={16} />
        </InputGroup.Text>
      </InputGroup>

      <Dropdown.Menu
        show={showDropdown && options.length > 0}
        className="w-100"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {options.map((option: AutoCompleteOption) => (
          <Dropdown.Item
            key={option.key}
            onClick={() => onSelect(option)}
            className="text-truncate"
          >
            {option.value}
          </Dropdown.Item>
        ))}
        {footer && (
          <>
            <Dropdown.Divider />
            <div className="px-3 py-2">{footer}</div>
          </>
        )}
      </Dropdown.Menu>
    </div>
  );
};

export default AutoComplete;
