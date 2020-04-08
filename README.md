# cloudbase-vue

Cloudbase Plugin for Vue

-------

## Install

```
npm install --save @cloudbase/vue-provider
```

------

## Usage

```html
<template>
  <div id="app">
    <LoginState v-slot="{ loginState }">
      <h1>{{ loginState ? '已登录' : '没登录' }}</h1>
    </LoginState>
  </div>
</template>

<script>
import Vue from "vue"
import Cloudbase from "@cloudbase/vue-provider"

Vue.use(Cloudbase, {
    env: "your-env-id"
})

export default {
  async created() {
    // 以自定义登录为例
    const ticket = await fetchTicket()
    this.$cloudbase.auth({ persistence: "local" }).signInWithTicket(ticket)
  }
}
</script>

```
--------

## Plugin API

### Vue.$cloudbase

可以在 Vue 组件的 `this.$cloudbase` 中，获取 Cloudbase 实例
```js
export default {
  data() {
    return {
      docs: []
    }
  },
  async created() {
    // 登录
    await this.$cloudbase.auth({ persistence: "local" }).signInWithTicket(ticket)
    // 数据库查询
    const queryResult = await this.$cloudbase.database().collection('test').where({}).get()
    this.docs = queryResult.data
  }
}
```
--------

## Components

- [LoginState](#loginstate)
- [DatabaseQuery](#databasequery)
- [DatabaseWatch](#databasewatch)
- [CloudFile](#cloudfile)

### LoginState
获取登录状态

#### Props

暂无

#### Slots

| slot       | type                   | 描述         |
| ---------- | ---------------------- | ------------ |
| loginState | `null` or `LoginState` | 当前是否登录 |
| loading    | `boolean`              | 是否加载中   |

#### Example
```html
<LoginState v-slot="{ loginState, loading }">
  <p>{{ loading ? '加载中' : (loginState ? '已登录' : '没登录') }}</p>
</LoginState>
```

-------


### DatabaseQuery

数据库查询

#### Props

| prop       | type       | 描述                                             |
| ---------- | ---------- | ------------------------------------------------ |
| collection | `string`   | 集合名                                           |
| query      | `function` | 返回自定的查询条件，如 `_ => ({ foo: _.gt(2) })` |

#### Slot

| slot    | type              | 描述           |
| ------- | ----------------- | -------------- |
| docs    | `Array<doc>`      | 文档组成的数组 |
| loading | `boolean`         | 是否加载中     |
| error   | `null` or `Error` | 错误           |

#### Example
```html
<DatabaseQuery
  v-slot="{ docs, loading, error }"
  collection="messages"
  :query="_ => ({ timestamp: _.gt(1573635456709) })"
>
  <p v-for="{ text } in docs">
    {{ text }}
  </p>
</DatabaseQuery>
```

-------

### DatabaseWatch

数据库实时监听

#### Props

| prop       | type       | 描述                                             |
| ---------- | ---------- | ------------------------------------------------ |
| collection | `string`   | 集合名                                           |
| query      | `function` | 返回自定的查询条件，如 `_ => ({ foo: _.gt(2) })` |

#### Slot
| slot    | type              | 描述           |
| ------- | ----------------- | -------------- |
| docs    | `Array<doc>`      | 文档组成的数组 |
| loading | `boolean`         | 是否加载中     |
| error   | `null` or `Error` | 错误           |

#### Example
```html
<DatabaseWatch
  v-slot="{ docs, loading, error }"
  collection="messages"
  :query="_ => ({ timestamp: _.gt(1573635456709) })"
>
  <p v-for="{ text } in docs">
    {{ text }}
  </p>
</DatabaseWatch>
```

------


### CloudFile

根据 `FileID`，获取云存储文件的真实 URL

#### Props

| slot | type     | 描述                          |
| ---- | -------- | ----------------------------- |
| id   | `string` | 云存储 ID，形如 `cloud://...` |

#### Slot
| slot    | type              | 描述           |
| ------- | ----------------- | -------------- |
| url     | `string`          | 文件的真实 URL |
| loading | `boolean`         | 是否加载中     |
| error   | `null` or `Error` | 错误           |

#### Example

```html
<CloudFile
    id="cloud://file-cloud-path"
    v-slot="{ url, loading }"
>
  {{ url ? url : 'loading...' }}
</CloudFile>
```
