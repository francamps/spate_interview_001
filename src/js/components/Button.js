import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import PropTypes from 'prop-types'

import { theme } from '../theme'

export default class Button extends React.PureComponent {

  handleClick = (e) => {
      const { onClick } = this.props
      e.preventDefault();
      onClick()
  }

  render() {
      const { children, type } = this.props

      return (
          <button
              type="button"
              className={css(
                  styles.button,
                  styles[type]
              )}
              onClick={this.handleClick}
          >
              { children }
          </button>
      )
  }
}

const styles = StyleSheet.create({
    button: {
        outline: '0',
        fontFamily: `${theme.font_family_base}`,
        fontSize: `${theme.font_size_base}`,
        fontWeight: `${theme.font_weight_medium}`,
        border: `1px solid ${theme.buttonColor_default}`,
        borderRadius: `${theme.borderRadius_base}`,
        transition: 'all .3s cubic-bezier(.645,.045,.355,1)',
        padding: `${theme.space_sm} ${theme.space_md}`,
        cursor: 'pointer',
        marginBottom: `${theme.space_xs}`,
        marginRight: `${theme.space_xs}`,
        display: 'block',
    },

    primary: {
        color: 'white',
        border: `1px solid ${theme.color_primary}`,
        background: `${theme.color_primary}`,
        ':hover': {
            background: `${theme.color_secondary}`,
            border: `1px solid ${theme.color_secondary}`,
        }
    },

    secondary: {
        color: `${theme.color_darkGray}`,
        background: `${theme.color_gray_primary}`,
        border: `1px solid ${theme.color_gray_primary}`,
        ':hover': {
            background: `${theme.color_gray_secondary}`,
            border: `1px solid ${theme.color_gray_secondary}`,
        }
    }

})

Button.propTypes = {
    type: PropTypes.oneOf(['primary', 'secondary'])
}

Button.defaultProps = {
    type: 'primary'
}
