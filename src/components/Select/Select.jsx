import {Select} from "antd";
import {useTheme} from "../../context/ThemeContext/ThemeContext2.jsx";

// eslint-disable-next-line react/prop-types
const SelectComponent = ({data,search=false}) => {

    const {currentTheme} = useTheme()

    const selectStyles = {
        backgroundColor: currentTheme.surface,
        color: currentTheme.text,
        borderColor: currentTheme.border,
    }

  return (
          <Select
              style={selectStyles}
              dropdownStyle={{
                  backgroundColor: currentTheme.surface,
              }}
              showSearch={search}
              size={"large"}
              placeholder="Select grade"
              filterOption={(input, option) =>
                  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
              }
              options={data}

              />
  )
}

export default SelectComponent