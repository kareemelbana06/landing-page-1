# Uber Journey Partner

In this project:

I want you to upgrade my existing Uber Invite landing page to a polished, professional, production-ready landing page with a 10/10 UI/UX quality.



IMPORTANT:



- Do NOT rebuild the project from scratch.

- Keep the existing functionality, referral code, links, and application flow working exactly as they are.

- Keep the existing invite code: "2n8s3pr".

- Do NOT invent statistics, testimonials, reviews, user counts, earnings, or claims.

- Do NOT make the page look like it is officially owned by Uber.

- Preserve the existing disclaimer that this is an independent referral page.

- Do not add unnecessary features or backend functionality.

- Focus heavily on visual hierarchy, trust, conversion, responsiveness, accessibility, and polish.



1. HERO SECTION



Redesign the hero section to immediately communicate:



"Start Your Journey With Uber"



Supporting text should clearly explain that the visitor can apply through the referral link and that the invite code is applied automatically when possible.



Make the referral code highly visible:



Invite Code

"2n8s3pr"



Add a small copy button beside the code with a polished interaction:



- Click to copy

- Show "Copied!" temporarily

- Use an accessible tooltip/label



Primary CTA:

"Start Your Application"



Secondary action:

"How It Works"



The primary CTA should have strong visual hierarchy and a subtle hover/press animation.



Make the hero feel premium and trustworthy rather than generic.



2. TRUST / TRANSPARENCY



Add a compact trust section directly below the hero.



Clearly communicate:



"This is an independent referral page. You’ll complete your application through Uber’s official platform."



Do not imply affiliation with Uber.



Use subtle trust indicators such as:



- Secure application

- Official Uber signup destination

- Referral code applied



Only use these if they are factually accurate based on the existing implementation.



3. BENEFITS SECTION



Improve the existing benefits/features section.



Use 3–4 clean cards with:



- Simple icons

- Short headings

- Concise descriptions

- Consistent spacing

- Subtle hover effects



Avoid excessive text.



Make the cards visually balanced on desktop and stack naturally on mobile.



4. HOW IT WORKS



Improve the existing steps section into a clean 3-step process:



1. Start your application

2. Complete your information

3. Finish the signup process



Use numbered steps or a visual progression.



Make it immediately understandable without reading large paragraphs.



5. REQUIREMENTS



Improve the requirements section.



Make requirements scannable using:



- Check icons

- Short bullet points

- Clear headings



Do not add requirements unless they already exist in the project or can be verified from the existing content.



Make this section visually lighter than the hero and benefits sections.



6. INVITE CODE CTA



Add a strong conversion-focused CTA section before the FAQ.



Example structure:



"Ready to get started?"



"Apply through the referral link and use invite code "2n8s3pr"."



Button:

"Start Your Application"



Make this section visually distinct but still consistent with the overall design.



7. FAQ



Convert the FAQ into an accessible accordion.



Requirements:



- Only one or a few answers visible at a time

- Smooth open/close animation

- Clear plus/minus indicator

- Keyboard accessible

- Proper ARIA attributes

- Good mobile spacing



Keep the existing FAQ information and do not invent answers.



8. FOOTER



Create a clean professional footer.



Include:



- Independent referral disclaimer

- Relevant navigation links

- Application CTA if appropriate

- Copyright/current year if already used by the project



Make the disclaimer easy to understand:



"This page is independently operated and is not affiliated with, endorsed by, or sponsored by Uber."



Do not overemphasize the disclaimer, but make it clearly visible.



9. VISUAL DESIGN



Improve the overall visual system:



- Premium modern SaaS-style landing page

- Strong typography hierarchy

- Consistent spacing system

- Better section transitions

- Consistent border radius

- Subtle shadows

- Clean cards

- Professional button states

- Smooth but restrained animations

- Avoid excessive gradients

- Avoid excessive glassmorphism

- Avoid clutter



The design should feel like a real production landing page rather than a template.



10. RESPONSIVE DESIGN



Prioritize mobile because a large percentage of visitors will likely arrive from a phone.



Check carefully at:



- 320px

- 375px

- 390px

- 430px

- tablet

- desktop



Make sure:



- No horizontal scrolling

- No text overflow

- Buttons are easy to tap

- Hero remains visually strong

- Cards stack correctly

- FAQ works perfectly

- Navigation remains usable



11. MICRO-INTERACTIONS



Add subtle professional interactions:



- Button hover

- Button press

- Card hover

- Copy-code feedback

- FAQ transitions

- Scroll reveal where appropriate



Keep animations fast and subtle.



Respect "prefers-reduced-motion".



12. ACCESSIBILITY



Improve accessibility throughout the page:



- Semantic HTML

- Proper heading hierarchy

- Accessible buttons

- Keyboard navigation

- Visible focus states

- Sufficient color contrast

- ARIA attributes where needed

- Descriptive labels for icons

- Do not rely on color alone to communicate information



13. PERFORMANCE



Keep the page lightweight.



Do not add large unnecessary libraries.



Optimize images/assets if any are used.



Avoid animations or effects that negatively affect performance.



14. SEO



Improve the page metadata:



- Clear title

- Meta description

- Open Graph metadata

- Appropriate favicon

- Semantic structure



Do not make misleading SEO claims or imply official Uber ownership.



15. FINAL QA



After implementing everything, inspect the entire page from top to bottom.



Check:



1. All existing links still work.

2. The application CTA works.

3. The referral code remains "2n8s3pr".

4. Copy button works.

5. FAQ accordion works.

6. Mobile layout is clean.

7. Desktop layout is balanced.

8. No overflow or broken elements.

9. No console errors.

10. No fake statistics or unsupported claims.

11. The page clearly communicates that it is an independent referral page.

12. Overall design looks polished enough for a professional portfolio.



Make the changes directly in the existing project and keep the implementation clean, reusable, and maintainable.

IMPORTANT — LOCAL IMAGES & ASSETS



Make sure ALL images used throughout the website are stored locally inside the project.



Requirements:



- Do NOT use external image URLs.

- Do NOT use Unsplash, Pexels, Pixabay, Cloudinary, remote CDNs, or any other external image hosting service for website images.

- Download/copy any required image assets into the project's local assets/public folder.

- Reference images using local project paths.

- If an existing image is currently loaded from an external URL, replace it with a local version.

- Do not use remote background images.

- Make sure all "<img>" elements use local assets.

- Make sure CSS "background-image" assets are also local.

- Keep image paths compatible with the production deployment on Vercel.

- Use optimized image formats such as WebP/AVIF where appropriate.

- Add meaningful "alt" text to all meaningful images.

- Use lazy loading for non-critical images where appropriate.

- Do not sacrifice visual quality when optimizing the images.



Before finishing, scan the entire project for:



- "http://" image sources

- "https://" image sources

- remote image URLs

- external background images

- external image/CDN dependencies



Replace any image dependencies you find with local assets.



The final website must be fully self-contained regarding its visual image assets, so the website continues displaying all images correctly even if an external image provider becomes unavailable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/d87a6f73-aead-4b4a-998e-5c048b741e0b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
