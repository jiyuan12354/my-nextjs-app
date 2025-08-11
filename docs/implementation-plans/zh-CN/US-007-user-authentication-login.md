# US-007 用户认证和登录 - 实现规划

## 用户故事

作为上班族用户，我希望能够使用我的凭证登录购物平台，以便我可以安全地访问我的个性化监控列表、价格提醒和购物计划。

## 前置条件

- Next.js 应用已配置 TypeScript
- Tailwind CSS 已配置样式
- PWA 配置已就位（来自 US-004）
- Header 组件存在用于导航集成
- 本地存储访问可用于会话管理

## 设计

### 视觉布局

认证系统将包含：
- **登录页面**：带有购物平台品牌的清洁、居中表单布局
- **登录表单**：带验证状态的邮箱/密码字段
- **Header 集成**：登录/退出按钮和用户状态显示
- **仪表板重定向**：登录后显示用户个性化内容的着陆页

### 颜色和排版

- **背景颜色**: 
  - 主要: bg-white dark:bg-gray-900
  - 表单容器: bg-white dark:bg-gray-800 with shadow-lg
  - 输入字段: bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600

- **排版**:
  - 页面标题: font-inter text-3xl font-bold text-gray-900 dark:text-white
  - 表单标签: font-inter text-sm font-medium text-gray-700 dark:text-gray-300
  - 错误消息: text-red-600 dark:text-red-400 text-sm
  - 成功消息: text-green-600 dark:text-green-400 text-sm

- **组件特定**:
  - 登录按钮: bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400
  - 输入焦点: ring-blue-500 border-blue-500
  - 错误状态: border-red-500 ring-red-500

### 交互模式

- **表单验证**: 
  - 实时邮箱格式验证
  - 密码字段切换可见性
  - 验证/加载期间禁用提交按钮
  - 表单提交时的加载转圈

- **认证流程**:
  - 登录状态之间的平滑过渡
  - 成功/错误反馈的提示通知
  - 成功登录后自动重定向
  - 记住我复选框与持久会话

### 测量和间距

- **登录容器**:
  ```
  max-w-md mx-auto mt-16 px-6 py-8
  ```

- **表单间距**:
  ```
  - 表单字段: space-y-4
  - 按钮边距: mt-6
  - 链接间距: mt-4 text-center
  - 容器内边距: p-6 md:p-8
  ```

### 响应式行为

- **桌面端 (lg: 1024px+)**:
  ```
  - 居中表单: max-w-md
  - 完整功能可见性
  - 记住我的并排布局
  ```

- **平板端 (md: 768px - 1023px)**:
  ```
  - 调整容器: max-w-sm
  - 维持表单布局
  - 优化触摸目标
  ```

- **移动端 (sm: < 768px)**:
  ```
  - 全宽容器: mx-4
  - 更大的触摸目标
  - 堆叠的表单元素
  ```

## 技术需求

### 组件结构

```
src/app/auth/
├── login/
│   └── page.tsx                    # 登录页面组件
└── _components/
    ├── LoginForm.tsx               # 主登录表单组件
    ├── AuthProvider.tsx            # 认证上下文提供者
    └── useAuth.ts                  # 认证钩子
src/lib/
├── auth/
│   ├── mock-auth.ts               # 模拟认证服务
│   ├── auth-storage.ts            # 本地存储管理
│   └── auth-types.ts              # 认证类型定义
```

### 必需组件

- LoginForm ⬜
- AuthProvider ⬜
- useAuth hook ⬜
- 模拟认证服务 ⬜

### 状态管理需求

```typescript
interface AuthState {
  // 认证状态
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  
  // 表单状态
  email: string;
  password: string;
  rememberMe: boolean;
  errors: Record<string, string>;
  
  // 会话状态
  sessionExpiry: Date | null;
  lastActivity: Date | null;
}

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
}

interface UserPreferences {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'zh-CN';
}

// 认证操作
const authActions = {
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  checkSession: () => boolean;
  updateUser: (user: Partial<User>) => void;
  clearErrors: () => void;
}
```

## 验收标准

### 布局和内容

1. 登录页面布局
   ```
   - 居中的表单容器
   - Shopping Monitor 品牌/标志
   - 清洁、专业的外观
   - 适用于所有设备的响应式设计
   ```

2. 表单元素
   ```
   - 带验证的邮箱输入
   - 带显示/隐藏切换的密码输入
   - 记住我复选框
   - 带加载状态的提交按钮
   - 错误消息显示区域
   ```

3. 导航集成
   ```
   - Header 中的登录/退出按钮
   - 登录时的用户头像/姓名显示
   - 受保护路由处理
   ```

### 功能性

1. 认证流程

   - [ ] 用户可以输入邮箱和密码
   - [ ] 表单验证邮箱格式和必填字段
   - [ ] 模拟认证检查预定义凭证
   - [ ] 成功登录在 localStorage 中存储会话
   - [ ] 失败登录显示适当的错误消息

2. 会话管理

   - [ ] 记住我选项延长会话持续时间
   - [ ] 用户在浏览器会话间保持登录
   - [ ] 会话过期得到优雅处理
   - [ ] 退出完全清除会话数据

3. UI/UX 功能
   - [ ] 密码可见性切换功能
   - [ ] 认证期间的加载状态
   - [ ] 成功/错误提示通知
   - [ ] 响应式设计在移动设备上工作

### 导航规则

- 未认证用户访问受保护路由时重定向到登录页面
- 成功登录重定向到仪表板或原始请求页面
- 退出重定向到登录页面并清除会话
- 已认证用户跳过登录页面直接进入仪表板

### 错误处理

- 无效邮箱格式显示验证错误
- 错误凭证显示"无效邮箱或密码"消息
- 网络错误显示"登录失败，请重试"消息
- 会话过期显示通知并重定向到登录

## 修改文件

```
src/app/auth/
├── login/
│   └── page.tsx ⬜                 # 登录页面
└── _components/
    ├── LoginForm.tsx ⬜             # 登录表单组件
    ├── AuthProvider.tsx ⬜          # 上下文提供者
    └── useAuth.ts ⬜                # 认证钩子

src/lib/auth/
├── mock-auth.ts ⬜                  # 模拟认证服务
├── auth-storage.ts ⬜               # 本地存储工具
└── auth-types.ts ⬜                 # 类型定义

src/components/layout/
└── Header.tsx ⬜                    # 更新认证集成

src/middleware.ts ⬜                  # 路由保护中间件
```

## 状态

🟨 进行中

1. 设置和配置

   - [ ] 创建认证目录结构
   - [ ] 设置认证状态的 TypeScript 接口
   - [ ] 配置模拟用户凭证
   - [ ] 设置本地存储工具

2. 核心认证

   - [ ] 实现 AuthProvider 上下文
   - [ ] 创建 useAuth 自定义钩子
   - [ ] 构建模拟认证服务
   - [ ] 实现会话管理

3. UI 实现

   - [ ] 创建 LoginForm 组件
   - [ ] 构建登录页面布局
   - [ ] 实现表单验证
   - [ ] 添加加载和错误状态

4. 集成
   - [ ] 使用认证状态更新 Header 组件
   - [ ] 实现路由保护中间件
   - [ ] 添加退出功能
   - [ ] 测试认证流程

## 依赖关系

- PWA 配置 (US-004) - 用于离线会话处理
- Header 组件 - 用于登录/退出集成
- 仪表板页面 - 用于登录后重定向
- 提示通知系统 - 用于用户反馈

## 相关故事

- US-008 (用户注册) - 认证系统的未来扩展
- US-009 (用户资料管理) - 需要认证上下文
- US-001 (监控产品价格) - 需要用户会话进行个性化

## 备注

### 技术考虑

1. **模拟认证实现**：使用存储在配置中的预定义用户凭证
2. **会话存储**：实现基于 localStorage 的会话与过期跟踪
3. **安全性**：即使在模拟模式下，也要遵循表单处理的安全最佳实践
4. **状态管理**：使用 React Context 进行全局认证状态
5. **路由保护**：实现中间件保护认证路由

### 业务需求

- **MVP 阶段**：仅模拟认证 - 不需要真实后端集成
- **演示凭证**：为演示提供易记的测试账户
- **会话持续时间**："记住我"默认 7 天，常规会话 1 天
- **用户体验**：与购物平台期望匹配的流畅、专业认证流程

## 测试需求

### 集成测试（目标：80% 覆盖率）

1. 认证流程测试

```typescript
describe('认证流程', () => {
  it('应该使用有效凭证成功登录', async () => {
    // 使用演示凭证测试模拟登录
  });

  it('应该在无效凭证时显示错误消息', async () => {
    // 测试失败的登录尝试
  });

  it('应该在页面重新加载时维持会话', async () => {
    // 测试会话持久性
  });
});
```

2. 表单验证测试

```typescript
describe('登录表单验证', () => {
  it('应该验证邮箱格式', async () => {
    // 测试邮箱验证
  });

  it('应该要求密码字段', async () => {
    // 测试必填字段验证
  });

  it('应该处理表单提交状态', async () => {
    // 测试加载和禁用状态
  });
});
```
