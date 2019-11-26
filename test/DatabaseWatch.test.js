const { mount, shallowMount } = require('@vue/test-utils')
const DatabaseWatch = require('../src/DatabaseWatch')

describe('DatabaseWatch', () => {
  it("...", () => {
    const wrapper = mount(DatabaseWatch, {
      slots: {
        default: '<div>ffffff</div>'
      }
    })

    console.log(wrapper.html())
  })
})