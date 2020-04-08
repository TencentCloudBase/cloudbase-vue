import { mount, shallowMount } from '@vue/test-utils'
import DatabaseWatch from '../src/DatabaseWatch'

let mockWatch, mockWhere, mockCollection, mockCloudbase
beforeEach(() => {
  mockWatch = jest.fn(() => { })
  mockWhere = jest.fn(() => {
    return {
      watch: mockWatch
    }
  })
  mockCollection = jest.fn(() => {
    return {
      where: mockWhere
    }
  })
  mockCloudbase = {
    database() {
      return {
        collection: mockCollection,
        command: {
          gt() {
            return 'this is a query'
          }
        }
      }
    }
  }
})
describe('DatabaseWatch', () => {
  it("能正常渲染子节点", () => {
    const wrapper = mount(DatabaseWatch, {
      mocks: {
        $cloudbase: mockCloudbase
      },
      propsData: {
        collection: 'test'
      },
      slots: {
        default: '<p>ffffffffff</p>'
      }
    })
    expect(wrapper.html()).toBe('<div>\n  <p>ffffffffff</p>\n</div>')
  })

  it("支持自定义tag", () => {
    const wrapper = mount(DatabaseWatch, {
      mocks: {
        $cloudbase: mockCloudbase
      },
      propsData: {
        collection: 'test',
        tag: 'p'
      },
      slots: {
        default: '<p>ffffffffff</p>'
      }
    })
    expect(wrapper.html()).toBe('<p>\n  <p>ffffffffff</p>\n</p>')
  })

  it("内部调用collection()、where()和watch()", () => {
    const wrapper = mount(DatabaseWatch, {
      mocks: {
        $cloudbase: mockCloudbase
      },
      propsData: {
        collection: 'test',
        tag: 'p',
        query: _ => _.gt()
      },
      slots: {
        default: '<p>ffffffffff</p>'
      }
    })
    expect(mockWhere.mock.calls[0][0]).toBe('this is a query')
    expect(mockCollection.mock.calls[0][0]).toBe('test')
    expect(typeof mockWatch.mock.calls[0][0].onChange).toBe('function')
    expect(typeof mockWatch.mock.calls[0][0].onError).toBe('function')
  })
})