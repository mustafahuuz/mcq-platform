Now I have all the content needed. Here are **200 additional PhD-level MCQ questions**:

---

# PhD Comprehensive Exam — 200 Additional MCQ Questions
### University of Baghdad / Al-Mustansiriyah | 2025–2026

---

## SECTION A — Advances in Deep Learning (Questions 1–34)

---

**Q1.** The output feature map size of a convolutional layer is computed as (A − K + 2P)/S + 1. For an input of size **32×32**, filter size **5×5**, padding **P=0**, and stride **S=1**, the output size is:

- A) 30×30
- B) 28×28
- C) 32×32
- D) 26×26

**✓ Answer: B** → (32 − 5 + 0)/1 + 1 = 28

---

**Q2.** The **SWISH** activation function is defined as f(x) = x · σ(x). Compared to ReLU, SWISH is described as:

- A) Monotonic and bounded above
- B) Non-monotonic and smooth, potentially outperforming ReLU on deep networks
- C) Identical to ReLU for all positive values and zero elsewhere
- D) Linear for all input values

**✓ Answer: B**

---

**Q3.** The **sigmoid activation** function has a maximum derivative of **0.25** (at x=0). This directly causes which training problem in deep networks?

- A) Exploding gradients in the output layer
- B) Vanishing gradients — gradients diminish exponentially as they backpropagate through many layers
- C) Overfitting due to excessive non-linearity
- D) Weight symmetry — all neurons learn the same features

**✓ Answer: B**

---

**Q4.** **Xavier initialization** sets weights from a Gaussian distribution with mean 0 and variance 1/N, where N is the number of inputs. The goal of this strategy is to:

- A) Set all weights to identical positive values for symmetric starting conditions
- B) Maintain consistent variance of activations and gradients across layers, preventing vanishing or exploding gradients
- C) Maximize the learning rate for faster convergence
- D) Ensure all gradients are exactly equal to 1 during the first forward pass

**✓ Answer: B**

---

**Q5.** In the **AdaGrad** optimizer, Gᵢ accumulates the sum of squared gradients. What is the known limitation of AdaGrad that AdaDelta was designed to fix?

- A) AdaGrad increases the learning rate over time, causing instability
- B) AdaGrad's learning rate monotonically decreases to zero because Gᵢ grows unbounded, halting learning
- C) AdaGrad requires knowing the total number of training steps in advance
- D) AdaGrad cannot handle sparse gradients

**✓ Answer: B**

---

**Q6.** In **Adam optimizer**, the default hyperparameters are β₁ = 0.9, β₂ = 0.999, ε = 10⁻⁸. What does the bias-correction step (dividing by 1−β^t) address?

- A) It scales the learning rate based on the batch size
- B) It corrects for the fact that m₀ and v₀ are initialized at zero, causing biased estimates at the start of training
- C) It prevents weight updates from exceeding the gradient clipping threshold
- D) It normalizes the loss function to be between 0 and 1

**✓ Answer: B**

---

**Q7.** **Dropout** regularization in fully connected layers works by:

- A) Reducing the learning rate by half every epoch
- B) Randomly setting neuron outputs to zero during training with probability p, preventing co-adaptation of neurons
- C) Adding L2 penalty terms to all weight values
- D) Replacing ReLU with sigmoid activation in selected layers

**✓ Answer: B**

---

**Q8.** The **GoogLeNet (Inception)** architecture introduced **Inception modules**. What is the key architectural idea of an Inception module?

- A) Each layer uses only 1×1 convolutions to reduce computation
- B) Parallel paths using 1×1, 3×3, and 5×5 convolutions plus max-pooling are concatenated, allowing the network to capture features at multiple scales simultaneously
- C) All convolution filters are replaced with depthwise separable convolutions
- D) Residual connections bypass every two layers

**✓ Answer: B**

---

**Q9.** GoogLeNet has **12× fewer parameters** than AlexNet. The primary architectural technique enabling this parameter reduction is:

- A) Using only 1 fully connected layer instead of 3
- B) 1×1 convolutions used as dimensionality reducers before expensive 3×3 and 5×5 convolutions
- C) Replacing all pooling layers with strided convolutions
- D) Using binary weights instead of floating-point weights

**✓ Answer: B**

---

**Q10.** In **LeNet-5** (1998), the activation function used was **tanh** (hyperbolic tangent). The output range of tanh(x) is:

- A) [0, 1]
- B) [−∞, +∞]
- C) [−1, +1]
- D) [0, +∞]

**✓ Answer: C**

---

**Q11.** **Max-pooling** with a 2×2 window reduces the spatial dimensions of a feature map by a factor of:

- A) 4 (each dimension halved)
- B) 2 (total area halved)
- C) 8
- D) No reduction — max-pooling only changes depth

**✓ Answer: A**

---

**Q12.** AlexNet used **Local Response Normalization (LRN)** between layers. LRN was introduced to simulate:

- A) Batch normalization across training examples
- B) Lateral inhibition in biological neurons — strong responses suppress neighboring neurons of similar orientation
- C) Dropout regularization in convolutional layers
- D) Weight decay applied only to the first layer

**✓ Answer: B**

---

**Q13.** In **VGGNet**, filters double in count after each max-pooling layer (64→128→256→512). What is the architectural rationale for this doubling?

- A) To ensure the total number of parameters remains constant as spatial dimensions shrink
- B) As spatial resolution halves, increasing depth (filter count) maintains representational capacity and compensates for reduced spatial information
- C) To match the number of filters to the number of output classes
- D) To prevent gradient explosion by distributing parameters evenly

**✓ Answer: B**

---

**Q14.** **ZFNet** improved upon AlexNet by reducing the first-layer filter size from 11×11 to 7×7 and stride from 4 to 2. What technique did ZFNet introduce to visualize what features different CNN layers learn?

- A) Grad-CAM (Gradient-weighted Class Activation Mapping)
- B) Deconvolution (unpooling + transposed convolution to project activations back to pixel space)
- C) t-SNE visualization of the fully connected layer embeddings
- D) Principal Component Analysis applied to filter weights

**✓ Answer: B**

---

**Q15.** A **Deep Belief Network (DBN)** is built by stacking multiple **RBMs**. During pre-training, the layers are trained:

- A) Simultaneously using backpropagation end-to-end
- B) Greedily one layer at a time — each RBM is trained unsupervised, then its hidden layer becomes the input to the next RBM
- C) Using supervised labels at every layer
- D) By random weight initialization without any pre-training

**✓ Answer: B**

---

**Q16.** An **Autoencoder** consists of an encoder and a decoder. The **bottleneck layer** (latent space) serves to:

- A) Increase the dimensionality of the input for better classification
- B) Force the network to learn a compressed representation capturing only the most salient features of the input
- C) Apply batch normalization to stabilize training
- D) Connect the encoder directly to the output classification layer

**✓ Answer: B**

---

**Q17.** In **Backpropagation**, the weight update rule is w_i ← w_i − μ · (∂E/∂w_i). If the learning rate μ is set too **high**, the likely consequence is:

- A) The model converges too slowly, requiring many more epochs
- B) The model underfits the training data
- C) Weight updates overshoot the minimum, causing the loss to oscillate or diverge
- D) All gradients become exactly zero

**✓ Answer: C**

---

**Q18.** **Transfer learning** is particularly beneficial when:

- A) The target dataset is very large and the source domain is unrelated
- B) The target dataset is small — using pre-trained weights avoids overfitting and reduces training time by initializing with useful features
- C) The target network architecture must be identical to the source architecture
- D) The source model was trained on random noise

**✓ Answer: B**

---

**Q19.** The **Cross-Entropy loss** for a single training example with target label y' and model output y is H(y) = −Σ y'ᵢ · log(yᵢ). For a correct one-hot prediction where yᵢ = 1 for the true class, the loss equals:

- A) 1
- B) 0
- C) −log(1) = 0
- D) ∞

**✓ Answer: C** → −1 · log(1) = 0

---

**Q20.** **Capsule Networks (CapsNet)** were proposed to address a fundamental limitation of traditional CNNs. What limitation do they address?

- A) CNNs cannot process images larger than 224×224
- B) Max-pooling discards spatial relationship information between features — CapsNets use dynamic routing to preserve spatial hierarchies
- C) CNNs require labeled data; CapsNets work with unlabeled data
- D) CNNs cannot be parallelized on GPUs

**✓ Answer: B**

---

**Q21.** **Mini-batch gradient descent** (batch size 50–256) is preferred over pure SGD because:

- A) It eliminates the need for backpropagation
- B) It reduces gradient variance compared to single-sample SGD while remaining computationally feasible and enabling GPU parallelism
- C) It guarantees finding the global minimum of the loss function
- D) It requires no learning rate tuning

**✓ Answer: B**

---

**Q22.** In **Batch Gradient Descent**, all training samples are used to compute the gradient before each weight update. The main disadvantage for large datasets is:

- A) The gradient estimate is too noisy to be useful
- B) It is computationally expensive and memory-intensive — loading the entire dataset for each update is impractical for millions of samples
- C) It cannot be used with convolutional layers
- D) Batch gradient descent always converges to a saddle point

**✓ Answer: B**

---

**Q23.** The **Softmax** function outputs a probability distribution. For input vector [2, 1, 0], the softmax output for the first element (value=2) is:

- A) 2/3
- B) e²/(e² + e¹ + e⁰)
- C) 1
- D) 0.5

**✓ Answer: B**

---

**Q24.** In **fingerprint recognition** using deep learning, the **Automatic Fingerprint Identification System (AFIS)** uses which types of features for matching?

- A) Only pixel intensity histograms
- B) Minutiae points (ridge endings and ridge bifurcations) and their spatial relationships
- C) Color histograms of the fingerprint image
- D) Only the overall ridge frequency pattern

**✓ Answer: B**

---

**Q25.** **ResNet-152** achieves a top-1 accuracy of **87%** on ImageNet (from the table). This is better than human performance (~80–90%). The key innovation enabling such depth (152 layers) without degradation is:

- A) Using very small learning rates throughout training
- B) Skip connections: H(x) = F(x) + x, where the network learns the residual F(x) = H(x) − x rather than the full mapping
- C) Replacing all fully connected layers with global average pooling
- D) Training on 10× more data than AlexNet

**✓ Answer: B**

---

**Q26.** **Overfitting** in deep learning is characterized by:

- A) High training error and high test error (underfitting)
- B) Low training error and high test error — the model memorizes training data but fails to generalize
- C) Equal training and test error regardless of dataset size
- D) Rapidly decreasing learning rate causing gradient vanishing

**✓ Answer: B**

---

**Q27.** The **Restricted Boltzmann Machine (RBM)** is a stochastic neural network with visible layer v and hidden layer h. The energy function E(v,h) and learning rule update weights in the direction that:

- A) Increases the energy of training data configurations
- B) Decreases energy for observed data configurations (lower energy = higher probability) while using Contrastive Divergence for the negative phase
- C) Maximizes the cross-entropy between visible and hidden units
- D) Minimizes the L2 norm of all weight matrices

**✓ Answer: B**

---

**Q28.** In the **GAN framework**, training instability commonly occurs when the discriminator becomes too strong early in training. This results in:

- A) The generator producing perfect samples immediately
- B) The generator receiving near-zero gradients (discriminator always outputs 0 for generated samples), making learning impossible — the **vanishing gradient problem for GANs**
- C) The discriminator collapsing to always predict "real"
- D) Both networks converging to the same loss value

**✓ Answer: B**

---

**Q29.** **L2 regularization** (weight decay) adds a penalty term λΣwᵢ² to the loss function. The effect on the weight update rule is:

- A) Weights are set to zero if they fall below threshold λ
- B) Each weight is scaled by (1 − 2λμ) at each step — larger weights are penalized more, encouraging smaller distributed weights
- C) The learning rate μ is multiplied by λ at each epoch
- D) Only the bias terms are affected by the L2 penalty

**✓ Answer: B**

---

**Q30.** **Data augmentation** during training artificially increases dataset size by applying transformations. Which of the following is NOT a standard augmentation technique for image classification?

- A) Random cropping
- B) Horizontal flipping
- C) Adding Gaussian noise
- D) Changing the ground truth label randomly

**✓ Answer: D**

---

**Q31.** The **VGG-Face** architecture for face recognition is based on:

- A) AlexNet with a different softmax output size
- B) VGGNet adapted for face recognition, trained on a large-scale face dataset with triplet loss
- C) ResNet-50 with attention mechanisms
- D) GoogLeNet with face-specific Inception modules

**✓ Answer: B**

---

**Q32.** In **unsupervised pre-training** for character recognition, the first step uses an RBM/DBN to learn features from **unlabeled data**. The second step uses:

- A) A second unsupervised RBM for clustering
- B) Supervised fine-tuning with labeled data using backpropagation, initializing from the pre-trained weights
- C) K-means clustering applied to the hidden layer activations
- D) Principal component analysis on the pre-trained features

**✓ Answer: B**

---

**Q33.** For a CNN processing a **224×224×3** input image (AlexNet style), the first convolution layer uses **96 filters of size 11×11×3** with stride 4 and no padding. The output volume dimensions are:

- A) 224×224×96
- B) 55×55×96
- C) 54×54×96
- D) 112×112×96

**✓ Answer: B** → (224 − 11)/4 + 1 = 54.25 → 55 (AlexNet uses 55×55×96)

---

**Q34.** The **Mean Squared Error (MSE)** loss is less preferred than Cross-Entropy for classification with Softmax because:

- A) MSE cannot be computed when outputs are probabilities
- B) MSE combined with Softmax produces flat gradients (saturated neurons) when predictions are confidently wrong, slowing learning
- C) MSE requires more memory than Cross-Entropy
- D) MSE is only valid for binary classification problems

**✓ Answer: B**

---

## SECTION B — Cryptography and Network Security (Questions 35–68)

---

**Q35.** In **AES-128**, the number of rounds is **10**, and each round (except the last) applies four transformations. Which transformation is **omitted** in the final round?

- A) SubBytes
- B) ShiftRows
- C) MixColumns
- D) AddRoundKey

**✓ Answer: C**

---

**Q36.** **AES SubBytes** applies a non-linear S-box transformation. The mathematical operation in GF(2⁸) is:

- A) A cyclic shift of the byte value
- B) Multiplicative inverse in GF(2⁸) followed by an affine transformation
- C) XOR with the round key
- D) Matrix multiplication with a fixed 4×4 matrix

**✓ Answer: B**

---

**Q37.** In **AES ShiftRows**, row i is cyclically shifted left by i positions. Row 3 (zero-indexed) is shifted by:

- A) 0 positions
- B) 1 position
- C) 2 positions
- D) 3 positions

**✓ Answer: D**

---

**Q38.** **AES MixColumns** operates on each column of the 4×4 State matrix using multiplication in GF(2⁸). The purpose of MixColumns is to achieve:

- A) Confusion — hide the relationship between key and ciphertext
- B) Diffusion — spread the influence of each plaintext byte across all bytes of the output column
- C) Key expansion — generate round subkeys
- D) Authentication — verify data integrity

**✓ Answer: B**

---

**Q39.** **ECB (Electronic Codebook) mode** is considered insecure for most applications because:

- A) It requires a large initialization vector that is difficult to share
- B) Identical plaintext blocks produce identical ciphertext blocks, revealing patterns in the encrypted data
- C) ECB mode does not support parallel encryption
- D) ECB mode is only 64-bit secure regardless of key size

**✓ Answer: B**

---

**Q40.** In **CBC mode**, decryption is parallelizable but encryption is not. Why can't CBC encryption be parallelized?

- A) Each ciphertext block Cᵢ = E(K, Pᵢ ⊕ Cᵢ₋₁) depends on the previous ciphertext block, creating a serial dependency
- B) The initialization vector must be recomputed for each block
- C) CBC requires a different key for each block
- D) The block cipher E() itself is not parallelizable

**✓ Answer: A**

---

**Q41.** **CTR (Counter) mode** converts a block cipher into a stream cipher. Its key advantage over CBC mode for certain applications is:

- A) CTR provides authenticated encryption automatically
- B) Both encryption and decryption are fully parallelizable, and random access to any block is possible without decrypting preceding blocks
- C) CTR does not require an initialization vector or nonce
- D) CTR has smaller error propagation than all other modes

**✓ Answer: B**

---

**Q42.** **Triple DES (3DES)** with the EDE construction (K₁≠K₂=K₃) provides approximately **112-bit** security instead of 168-bit because:

- A) The EDE structure introduces a weakness in the key schedule
- B) Meet-in-the-middle attack reduces effective security from 3×56=168 to 112 bits
- C) K₂=K₃ means two keys are identical, reducing the key space
- D) DES rounds are not commutative under this key configuration

**✓ Answer: C** *(2-key 3DES: K₁≠K₂, K₃=K₁; effective 112 bits due to meet-in-the-middle on the two independent keys)*

---

**Q43.** **RC4** was broken and is now prohibited in TLS (RFC 7465). The primary cryptographic weakness that led to its prohibition is:

- A) RC4 uses only a 40-bit key, making brute force trivial
- B) Statistical biases in the first 256 bytes of the keystream; when IVs were reused (as in WEP), attackers could recover the key
- C) RC4 is a block cipher and cannot be used as a stream cipher
- D) RC4 requires a public key infrastructure to operate

**✓ Answer: B**

---

**Q44.** In RSA key generation, e = 65537 (2¹⁶ + 1) is the most common choice for the public exponent. The reason for this specific value is:

- A) It provides maximum security against factorization attacks
- B) It has only two 1-bits in binary (efficient modular exponentiation via square-and-multiply) and is large enough to avoid small-e attacks
- C) It equals φ(n) / 2 for all valid RSA moduli
- D) It was mandated by NIST for all RSA implementations after 2000

**✓ Answer: B**

---

**Q45.** The **Hastad broadcast attack** on RSA exploits what vulnerability?

- A) Using a weak random number generator for prime selection
- B) Sending the same message M to 3 recipients with e=3 and different moduli — combining ciphertexts via CRT reveals M³, then the cube root gives M
- C) Timing differences during modular exponentiation
- D) Using n < 1024 bits in the RSA modulus

**✓ Answer: B**

---

**Q46.** **OAEP (Optimal Asymmetric Encryption Padding)** was introduced for RSA to protect against:

- A) Brute force attacks on small key sizes
- B) Chosen-ciphertext attacks on textbook RSA — OAEP randomizes encryption so identical plaintexts produce different ciphertexts
- C) Man-in-the-middle attacks during key exchange
- D) Timing attacks on modular exponentiation

**✓ Answer: B**

---

**Q47.** In **Diffie-Hellman Key Exchange** with public parameters (p=23, g=5), Alice chooses private key a=6. Her public value A sent to Bob is:

- A) 5⁶ mod 23 = 8
- B) 6⁵ mod 23 = 7
- C) 23⁶ mod 5 = 3
- D) 6 × 5 mod 23 = 7

**✓ Answer: A** → 5⁶ = 15625; 15625 mod 23 = 8

---

**Q48.** DHKE is **vulnerable to Man-in-the-Middle (MitM) attacks** because:

- A) The shared secret is transmitted in plaintext
- B) The protocol provides no authentication — an attacker can intercept and replace both parties' public values, establishing separate shared secrets with each
- C) The discrete logarithm problem has been solved for the parameters DHKE uses
- D) The protocol requires a trusted third party for key distribution

**✓ Answer: B**

---

**Q49.** **Elliptic Curve Cryptography (ECC)** achieves equivalent security to RSA with much smaller key sizes. A **256-bit ECC key** provides security roughly equivalent to a:

- A) 256-bit RSA key
- B) 512-bit RSA key
- C) 3072-bit RSA key
- D) 128-bit RSA key

**✓ Answer: C**

---

**Q50.** In **ElGamal encryption**, the same plaintext M encrypted twice (with different random k) produces different ciphertexts. This property is called:

- A) Perfect forward secrecy
- B) Probabilistic encryption — ciphertext randomness depends on the random k chosen each time
- C) Homomorphic encryption
- D) Semantic security under RSA assumption

**✓ Answer: B**

---

**Q51.** The **Chinese Remainder Theorem (CRT)** is used to **speed up RSA decryption** by:

- A) Reducing the key size from 2048 to 1024 bits
- B) Computing M mod p and M mod q separately (using smaller moduli), then combining results — approximately 4× speedup over direct computation mod n
- C) Replacing modular exponentiation with simple multiplication
- D) Pre-computing all possible decryption results in a lookup table

**✓ Answer: B**

---

**Q52.** A **passive attack** on a communication system differs from an **active attack** in that:

- A) Passive attacks modify data; active attacks only observe it
- B) Passive attacks (eavesdropping, traffic analysis) do not alter the data stream — prevention via encryption is the goal; active attacks alter data — detection and recovery are the goals
- C) Passive attacks are easier to detect than active attacks
- D) Passive attacks target only wireless communications

**✓ Answer: B**

---

**Q53.** The **Miller-Rabin test** classifies an integer n as "probably prime" after t rounds. The probability of a **false positive** (composite declared prime) is at most:

- A) 1/t
- B) 4^(−t)
- C) 1/2^t
- D) t/n

**✓ Answer: B**

---

**Q54.** In the **Feistel cipher**, each round computes: Lᵢ = Rᵢ₋₁ and Rᵢ = Lᵢ₋₁ ⊕ F(Rᵢ₋₁, Kᵢ). This design ensures decryption uses:

- A) A completely different set of equations
- B) The identical structure — only the subkey order is reversed — enabling decryption without a separate inverse algorithm
- C) F⁻¹(·), the inverse of the round function F
- D) Double the number of rounds as encryption

**✓ Answer: B**

---

**Q55.** **DES S-boxes** (8 total, each mapping 6-bit input to 4-bit output) provide which cryptographic property?

- A) Diffusion — spreading plaintext influence across the ciphertext
- B) Confusion — creating a complex, non-linear relationship between the key and ciphertext
- C) Authentication — verifying message integrity
- D) Key expansion — generating round subkeys

**✓ Answer: B**

---

**Q56.** The **Hill cipher** encrypts by computing C = KP mod 26 where K is an n×n matrix. Its vulnerability to cryptanalysis is:

- A) It has only 26 possible keys
- B) It is completely linear — a known-plaintext attack requires only n plaintext-ciphertext pairs to solve for K using linear algebra
- C) The key matrix is always symmetric, halving the key space
- D) It cannot encrypt messages longer than n characters

**✓ Answer: B**

---

**Q57.** **Euler's Totient function** φ(n) for n = p · q (distinct primes p and q) equals (p−1)(q−1). For p=5, q=7, the value is:

- A) 35
- B) 24
- C) 28
- D) 30

**✓ Answer: B** → (5−1)(7−1) = 4×6 = 24

---

**Q58.** The **General Number Field Sieve (GNFS)** is the most efficient known classical algorithm for factoring large integers. Its time complexity is:

- A) Polynomial in the size of n — O(n^k) for some constant k
- B) Sub-exponential — O(exp((64/9 · ln n)^(1/3) · (ln ln n)^(2/3)))
- C) Exponential — O(2^n)
- D) Linear in the number of digits of n

**✓ Answer: B**

---

**Q59.** In **CBC-MAC**, a Message Authentication Code is generated using CBC mode where only the final block is output. An attacker who knows MAC(M) for message M can compute MAC(M ∥ X) without the key. This is called:

- A) Timing attack
- B) Length extension attack — appending X to M and XORing the intermediate value with X allows computing the final MAC
- C) Differential cryptanalysis
- D) Birthday attack

**✓ Answer: B**

---

**Q60.** **NIST SP 800-57** recommends minimum RSA key sizes for long-term security. For security through **2030 and beyond**, the recommended minimum is:

- A) 1024-bit
- B) 2048-bit
- C) 3072-bit
- D) 512-bit

**✓ Answer: C**

---

**Q61.** The **GF(2⁸)** field used in AES has exactly:

- A) 2⁸ = 256 elements, each a polynomial of degree ≤ 7 with binary coefficients
- B) 256 elements including the zero element, and every non-zero element has a multiplicative inverse
- C) Both A and B are correct
- D) Neither A nor B — GF(2⁸) has 512 elements

**✓ Answer: C**

---

**Q62.** A **one-time pad (OTP)** achieves **perfect secrecy** (Shannon 1949). The practical limitation that makes OTP infeasible for most applications is:

- A) OTP requires a quantum computer to generate truly random keys
- B) The key must be as long as the message, truly random, used only once, and securely distributed — making key management impractical
- C) OTP cannot encrypt binary data, only text
- D) OTP is patented and not freely available

**✓ Answer: B**

---

**Q63.** **Fermat's Little Theorem** states aᵖ⁻¹ ≡ 1 (mod p) for prime p and gcd(a,p)=1. For a=3, p=7, the value of 3⁶ mod 7 is:

- A) 3
- B) 1
- C) 6
- D) 0

**✓ Answer: B** → 3⁶ = 729; 729 mod 7 = 1

---

**Q64.** In the **OSI Security Architecture**, **Non-repudiation** as a security service means:

- A) Preventing unauthorized access to network resources
- B) Providing proof of the origin or delivery of data, preventing a sender or receiver from falsely denying having participated in a communication
- C) Ensuring all transmitted data remains confidential
- D) Detecting and preventing denial-of-service attacks

**✓ Answer: B**

---

**Q65.** The **Vigenère cipher** with key "KEY" encrypts plaintext letter 'A' (position 0) using key letter 'K' (position 10). The ciphertext letter is at position:

- A) 10
- B) 0
- C) 11
- D) 26

**✓ Answer: A** → (0 + 10) mod 26 = 10 = 'K'

---

**Q66.** An **LFSR (Linear Feedback Shift Register)** of n stages achieves a maximum period of 2ⁿ−1 when:

- A) The feedback polynomial is any polynomial of degree n
- B) The feedback polynomial is **primitive** (irreducible and a generator of GF(2ⁿ))
- C) All stages are initialized to 1
- D) The register length n is a prime number

**✓ Answer: B**

---

**Q67.** **CTR-DRBG** (based on AES) is the **preferred** deterministic random bit generator according to NIST SP 800-90A. It is preferred over Hash-DRBG and HMAC-DRBG because:

- A) CTR-DRBG requires less memory than hash-based DRBGs
- B) AES hardware acceleration is widely available, making CTR-DRBG significantly faster in practice
- C) CTR-DRBG has a longer period than hash-based approaches
- D) CTR-DRBG does not require a seed

**✓ Answer: B**

---

**Q68.** In RSA, given p=17, q=11, n=187, e=7, d=23: encrypting M=88 gives C = 88⁷ mod 187 = 11. Decrypting C=11 gives M = 11²³ mod 187. The mathematical theorem guaranteeing this round-trip correctness is:

- A) Fermat's Little Theorem
- B) Euler's Theorem: M^(ed) ≡ M^(1+kφ(n)) ≡ M (mod n) because ed ≡ 1 (mod φ(n))
- C) Chinese Remainder Theorem
- D) Discrete Logarithm hardness assumption

**✓ Answer: B**

---

## SECTION C — Data Mining (Questions 69–102)

---

**Q69.** The **KDD process** was defined by Fayyad et al. Data mining is best characterized as which step?

- A) The first step — selecting data from raw sources
- B) The core step — applying intelligent methods to extract patterns from preprocessed data
- C) The last step — visualizing and presenting discovered knowledge
- D) The second step — integrating data from multiple sources

**✓ Answer: B**

---

**Q70.** **Min-Max normalization** transforms a value v to the range [new_min, new_max] using the formula v' = ((v − min_A)/(max_A − min_A)) × (new_max − new_min) + new_min. Normalizing v=50 where min_A=0, max_A=100 to [0, 1] gives:

- A) 0.25
- B) 0.50
- C) 0.75
- D) 1.00

**✓ Answer: B** → (50−0)/(100−0) × (1−0) + 0 = 0.50

---

**Q71.** **Z-score normalization** is defined as v' = (v − μ)/σ. This normalization is useful when:

- A) The data has a known min and max range
- B) The actual minimum and maximum are unknown or outliers exist — data is normalized relative to the mean and standard deviation
- C) All attribute values must be between 0 and 1
- D) The data follows a uniform distribution

**✓ Answer: B**

---

**Q72.** **Principal Component Analysis (PCA)** is used for dimensionality reduction in data mining. PCA finds:

- A) The k attributes with the highest variance in the original space
- B) k orthogonal vectors (principal components) that maximize variance in the projected space — each successive component is orthogonal to all previous ones
- C) The k clusters with minimum within-cluster variance
- D) The k attributes most correlated with the class label

**✓ Answer: B**

---

**Q73.** In the **Apriori algorithm**, the candidate itemset generation step uses the anti-monotone property. If itemset {A, B, C} is infrequent, which of the following can be immediately pruned?

- A) {A, B}
- B) {A, C}
- C) {A, B, C, D}
- D) {B, C}

**✓ Answer: C** → Any superset of an infrequent itemset is also infrequent

---

**Q74.** The **FP-tree** data structure in FP-Growth compresses the transaction database. When mining frequent patterns from an FP-tree, the algorithm avoids candidate generation by:

- A) Sorting all transactions in alphabetical order before building the tree
- B) Extracting conditional pattern bases by following node links, then building conditional FP-trees recursively for each frequent item
- C) Applying the Apriori algorithm on the compressed tree structure
- D) Building a separate FP-tree for each support threshold

**✓ Answer: B**

---

**Q75.** The **information gain** criterion (ID3) for attribute A at node D is computed as Gain(A) = Info(D) − Info_A(D). The attribute with the **highest** information gain is selected because:

- A) It has the most distinct values, ensuring the deepest tree
- B) It provides the greatest reduction in entropy — splitting on this attribute creates the purest child partitions
- C) It has the lowest variance among all attributes
- D) It is most strongly correlated with other attributes

**✓ Answer: B**

---

**Q76.** **Gain Ratio** (used in C4.5) was introduced to overcome a limitation of Information Gain. What limitation does it address?

- A) Information Gain is undefined for attributes with only two values
- B) Information Gain is biased toward attributes with many distinct values (e.g., ID attributes) — Gain Ratio penalizes by the split information
- C) Information Gain cannot handle missing attribute values
- D) Information Gain always selects continuous attributes over discrete ones

**✓ Answer: B**

---

**Q77.** In **Naïve Bayes** classification, the class with the highest posterior probability P(Cᵢ|X) is selected. Using Bayes' theorem, this equals:

- A) P(X|Cᵢ) only
- B) P(Cᵢ) · Π P(xₖ|Cᵢ) (proportional to — the denominator P(X) is constant across classes)
- C) 1 / P(X)
- D) P(X|Cᵢ) − P(Cᵢ)

**✓ Answer: B**

---

**Q78.** A **Support Vector Machine (SVM)** finds the optimal hyperplane by maximizing the **margin**. The margin is defined as:

- A) The average distance from all training points to the hyperplane
- B) The distance between the two parallel supporting hyperplanes (passing through the support vectors of each class)
- C) The sum of squared distances from all training points to the hyperplane
- D) The difference between the largest and smallest feature values

**✓ Answer: B**

---

**Q79.** In **k-fold cross-validation**, the dataset is divided into k equal parts. Each part serves once as the test set while the remaining k−1 parts are used for training. The final performance estimate is:

- A) The maximum accuracy over all k folds
- B) The average performance over all k folds — this provides a less biased estimate than a single holdout split
- C) The performance on the last fold only
- D) The minimum accuracy over all k folds

**✓ Answer: B**

---

**Q80.** The **F1-score** metric balances precision and recall. It is computed as:

- A) (Precision + Recall) / 2
- B) 2 × (Precision × Recall) / (Precision + Recall) — the harmonic mean
- C) Precision × Recall
- D) Precision / Recall

**✓ Answer: B**

---

**Q81.** **DBSCAN** requires two parameters: ε (neighborhood radius) and MinPts (minimum points for core status). A point that lies within the ε-neighborhood of a core point but has fewer than MinPts neighbors itself is called:

- A) Core point
- B) Border point
- C) Noise point
- D) Outlier point

**✓ Answer: B**

---

**Q82.** The **OPTICS** algorithm improves upon DBSCAN by:

- A) Requiring only one parameter (MinPts) instead of two
- B) Producing a cluster ordering that encodes density-based clustering structure for all ε values — enabling detection of clusters of varying density without specifying ε
- C) Using Euclidean distance exclusively for all distance computations
- D) Running in O(1) time complexity

**✓ Answer: B**

---

**Q83.** In **hierarchical clustering**, **complete linkage** (maximum linkage) computes the distance between two clusters as:

- A) Distance between the closest pair of points across clusters
- B) Distance between the most distant pair of points — one from each cluster
- C) Average distance between all pairs of points across clusters
- D) Distance between the cluster centroids

**✓ Answer: B**

---

**Q84.** A **data warehouse** is characterized as **non-volatile**. This means:

- A) Data in the warehouse changes in real-time as transactions occur
- B) Once loaded, data is generally not updated or deleted — the warehouse supports read-only queries for analysis
- C) The warehouse automatically replicates data to prevent loss
- D) Only the most recent data is stored; historical data is discarded

**✓ Answer: B**

---

**Q85.** **OLAP Roll-up** navigates from a lower to a higher level of abstraction. Which operation is its inverse?

- A) Slice
- B) Drill-down
- C) Dice
- D) Pivot

**✓ Answer: B**

---

**Q86.** In multidimensional OLAP, the measure **MEDIAN** is classified as a **holistic** measure because:

- A) It can be computed by summing sub-aggregate values
- B) Computing the median requires access to the complete dataset or sorted order — it cannot be derived from partial aggregates
- C) It can be derived algebraically from SUM and COUNT
- D) It equals the mode for normally distributed data

**✓ Answer: B**

---

**Q87.** The **CAP Theorem** in distributed databases states that a system can guarantee at most two of three properties simultaneously. Most cloud storage systems sacrifice **Consistency** to maintain:

- A) Availability and Partition-tolerance — giving "eventual consistency"
- B) Security and Availability
- C) Consistency and Availability
- D) Performance and Partition-tolerance

**✓ Answer: A**

---

**Q88.** **Sequential pattern mining** (e.g., using GSP or PrefixSpan) differs from association rule mining in that:

- A) Sequential patterns consider only itemsets, not their order
- B) Sequential patterns consider **ordered** sequences of events — the temporal order between itemsets matters
- C) Sequential patterns cannot have minimum support thresholds
- D) Sequential patterns only apply to transaction databases

**✓ Answer: B**

---

**Q89.** The **Chi-Square (χ²)** statistic is used for correlation analysis between two attributes A and B. A χ² value near **zero** indicates:

- A) A is strongly negatively correlated with B
- B) A and B are statistically independent — the observed values match the expected values under independence
- C) A determines B with 100% confidence
- D) B is redundant and should be removed from the dataset

**✓ Answer: B**

---

**Q90.** **Attribute-Oriented Induction (AOI)** generalizes data by replacing specific attribute values with higher-level concepts from a concept hierarchy. The process starts by:

- A) Building a decision tree from the raw data
- B) Retrieving the task-relevant data, then generalizing attributes by climbing concept hierarchies until the desired level of abstraction is reached
- C) Applying k-means to cluster similar attributes
- D) Computing information gain for each attribute

**✓ Answer: B**

---

**Q91.** In the **IQR (Interquartile Range)** method for outlier detection, values beyond Q3 + 1.5×IQR or below Q1 − 1.5×IQR are considered potential outliers. The IQR is defined as:

- A) (max − min) / 2
- B) Q3 − Q1 (the range of the middle 50% of data)
- C) Q2 − Q1 (the lower half range)
- D) Standard deviation × 2

**✓ Answer: B**

---

**Q92.** **Privacy-preserving data mining** addresses the concern that mining can reveal sensitive individual information. A common technique is **data perturbation**, which involves:

- A) Removing all identifying attributes before mining
- B) Adding random noise to sensitive attribute values so individual records are obscured while statistical properties of the dataset are approximately preserved
- C) Encrypting the entire database before mining
- D) Replacing sensitive values with the class mean

**✓ Answer: B**

---

**Q93.** The **Cosine measure** for itemsets A and B is defined as P(A∪B) / √(P(A)·P(B)). Its range is:

- A) [−1, 1]
- B) [0, 1] — always non-negative since support values are probabilities
- C) [0, ∞]
- D) [−∞, +∞]

**✓ Answer: B**

---

**Q94.** In **web mining**, **web content mining** is distinct from **web structure mining** in that:

- A) Web content mining analyzes hyperlink structure; web structure mining analyzes textual content
- B) Web content mining extracts knowledge from the actual content of web pages (text, images, data); web structure mining analyzes the hyperlink topology of the web
- C) Web content mining is unsupervised; web structure mining is always supervised
- D) Both are identical — they are two names for the same process

**✓ Answer: B**

---

**Q95.** **Expectation-Maximization (EM)** clustering iterates between two steps. The **M-step** (Maximization) computes:

- A) The probability that each data point belongs to each cluster (soft assignment)
- B) New parameter estimates (means, variances, mixing weights) that maximize the expected log-likelihood computed in the E-step
- C) The number of clusters k that minimizes the within-cluster variance
- D) The distance from each point to its nearest centroid

**✓ Answer: B**

---

**Q96.** A **bitmap index** in an OLAP system represents each distinct attribute value as a **bit vector**. The advantage of bitmap indexes for OLAP queries is:

- A) They reduce storage compared to all other index types
- B) Boolean operations (AND, OR, NOT) on bit vectors efficiently answer multi-dimensional queries — especially effective for low-cardinality dimensions
- C) They automatically update when new data is inserted
- D) They work best for high-cardinality attributes like customer IDs

**✓ Answer: B**

---

**Q97.** **Graph mining** using **Apriori-based approaches** (such as AGM/FSG) applies the anti-monotone property to graphs. A graph G is **frequent** if its **support** (number of graphs in the database containing G as a subgraph) meets the minimum support threshold. If G is infrequent:

- A) All subgraphs of G are also infrequent
- B) All supergraphs (graphs that contain G as a subgraph) are also infrequent
- C) G contains a frequent subgraph
- D) No conclusion can be drawn about G's subgraphs

**✓ Answer: B**

---

**Q98.** In **spatial data mining**, a **spatial association rule** might state "80% of houses near a lake are expensive." The proximity predicate "near" requires special handling because:

- A) Spatial proximity is measured in Euclidean distance, not Hamming distance
- B) Spatial relationships (near, adjacent, within) are not stored as simple attribute values but must be computed from coordinates using spatial joins
- C) Spatial data cannot be stored in relational databases
- D) The Apriori algorithm cannot handle spatial attributes

**✓ Answer: B**

---

**Q99.** The **Pearson correlation coefficient** r_AB for two attributes A and B equals +1. This means:

- A) A causes B
- B) A and B have a perfect positive linear relationship — as A increases, B increases proportionally
- C) A and B are statistically independent
- D) A equals B for all data points

**✓ Answer: B**

---

**Q100.** **Concept drift** in data stream mining refers to:

- A) Data records arriving faster than the algorithm can process them
- B) Changes in the underlying data distribution over time — models trained on past data may become inaccurate as patterns evolve
- C) Missing values appearing in streaming data
- D) Memory overflow caused by storing too many data stream items

**✓ Answer: B**

---

**Q101.** The **Holdout method** for classifier evaluation divides data into training and test sets (e.g., 2/3 training, 1/3 test). Its main disadvantage compared to k-fold cross-validation is:

- A) The holdout method always overestimates accuracy
- B) A significant portion of data is reserved for testing and unavailable for training — the accuracy estimate may have high variance depending on which samples are in each partition
- C) The holdout method cannot be used for binary classification
- D) The holdout method requires k separate classifier evaluations

**✓ Answer: B**

---

**Q102.** In **Multidimensional Association Rules**, a **hybrid-dimensional** rule involves:

- A) Only one attribute repeated at different levels of a hierarchy
- B) Two or more dimensions (attributes) with at least one attribute appearing more than once — enabling rules like age(X,"30..39") ∧ buys(X, "laptop") ⇒ buys(X, "printer")
- C) Rules derived exclusively from a single transaction database
- D) Rules with confidence exactly equal to 1.0

**✓ Answer: B**

---

## SECTION D — Handbook of Cloud Computing (Questions 103–136)

---

**Q103.** The **CAP Theorem** was conjecture by Brewer (2000) and formally proven by:

- A) Dean & Ghemawat (Google, 2004)
- B) Gilbert & Lynch (MIT, 2002)
- C) Amazon DynamoDB team (2007)
- D) Lamport (1978) in his distributed systems paper

**✓ Answer: B**

---

**Q104.** **Amazon Dynamo** uses **consistent hashing** for data partitioning. In consistent hashing, the hash space is treated as a ring divided into Q partitions. Adding a new node to the ring:

- A) Requires rehashing all keys in the entire database
- B) Only requires redistributing the keys from the node's adjacent predecessor — minimizing data movement during scaling
- C) Requires doubling the total number of partitions Q
- D) Forces all existing nodes to recompute their partition assignments

**✓ Answer: B**

---

**Q105.** In **Amazon Dynamo**, the condition **R + W > N** ensures:

- A) Availability during network partitions
- B) Strong consistency in quorum replication — read and write quorums overlap, guaranteeing any read sees the latest write
- C) Maximum throughput for write operations
- D) Durability — all N replicas must acknowledge writes

**✓ Answer: B**

---

**Q106.** In **Google File System (GFS)**, the default chunk size is **64 MB**. What is the primary advantage of large chunk sizes?

- A) Reduces storage overhead for small files
- B) Reduces the amount of metadata the Master must store and reduces client-Master communication for large sequential reads — clients interact with the same chunk server for extended periods
- C) Eliminates the need for data replication
- D) Enables faster random access to arbitrary file positions

**✓ Answer: B**

---

**Q107.** The **GFS Master** server handles which operations? (Select the best answer)

- A) Storing actual file data in 64 MB chunks
- B) Namespace management, chunk lease management, garbage collection, and chunk migration — all metadata operations; data flows directly between clients and chunkservers
- C) Encrypting all data before storage on chunkservers
- D) Serving client read requests directly from its memory cache

**✓ Answer: B**

---

**Q108.** **HDFS** (Hadoop Distributed File System) rack-aware replica placement stores three replicas as:

- A) All three on the same node for fast access
- B) First replica on the local node, second on a different rack, third on the same rack as the second — balancing reliability and network bandwidth
- C) All three on different data centers globally
- D) First on local node, second on a random node, third on the master node

**✓ Answer: B**

---

**Q109.** In **MapReduce**, the **Reduce** function receives:

- A) Raw input data directly from HDFS
- B) A key and a list of all values associated with that key (after the shuffle and sort phase groups intermediate key-value pairs)
- C) A single key-value pair from the Map output
- D) The complete sorted dataset from all Map tasks

**✓ Answer: B**

---

**Q110.** The **design principle** "Move compute to data" in Hadoop/MapReduce means:

- A) Users must manually copy their programs to each data node before running jobs
- B) The framework schedules Map tasks on the nodes where the data resides — minimizing network I/O (which is the bottleneck in large clusters)
- C) All computation is performed in the database storage layer
- D) Data is moved to a central compute node before processing

**✓ Answer: B**

---

**Q111.** A **Virtual Private Cloud (VPC)** addresses the **cost-versus-control dilemma** by:

- A) Providing dedicated physical hardware to each organization at public cloud prices
- B) Connecting an organization's IT resources to a dynamically allocated subset of a provider's resources via VPN, applying organizational controls — combining public cloud cost savings with private cloud control
- C) Eliminating the need for a VPN by using public Internet directly
- D) Requiring organizations to manage their own physical data centers

**✓ Answer: B**

---

**Q112.** **NIST defines four cloud deployment models**. A **Community Cloud** is:

- A) A cloud available to the general public over the Internet
- B) A cloud shared by a specific group of organizations with common concerns (compliance, security requirements, mission)
- C) A private cloud operated exclusively for one organization
- D) A combination of public and private clouds

**✓ Answer: B**

---

**Q113.** The **Clos (fat-tree) topology** is used in modern data center networks because:

- A) It requires fewer physical cables than mesh topologies
- B) It provides full bisection bandwidth — any node can communicate with any other node at full network speed — eliminating bottlenecks in east-west traffic
- C) It is the only topology supported by Ethernet switches
- D) It minimizes the number of switches needed in large data centers

**✓ Answer: B**

---

**Q114.** **DWDM (Dense Wavelength Division Multiplexing)** is used in Data Center Interconnect (DCI) networks to:

- A) Provide wireless connectivity between geographically separated data centers
- B) Transmit multiple wavelengths (colors) of light simultaneously over a single fiber, multiplying effective bandwidth for inter-data-center links
- C) Compress data before transmission to reduce bandwidth requirements
- D) Encrypt all inter-data-center traffic

**✓ Answer: B**

---

**Q115.** In the **IBM Cloud Adoption Blueprint**, the **Strategy Phase** includes Value Proposition Analysis. What is the purpose of this analysis?

- A) To select the cloud provider with the lowest cost
- B) To identify business value and ROI from cloud adoption, and document the vision aligned with business goals
- C) To audit current IT infrastructure for security vulnerabilities
- D) To write the technical architecture for the cloud deployment

**✓ Answer: B**

---

**Q116.** Cloud computing's **pay-per-use pricing** model eliminates:

- A) The need for SLA agreements with cloud providers
- B) Capital expenditure (CapEx) for IT infrastructure — organizations pay operational expense (OpEx) only for capacity actually consumed
- C) The need for capacity planning entirely
- D) Bandwidth costs for data transfer

**✓ Answer: B**

---

**Q117.** **Virtualization** in cloud computing uses **hypervisors**. The key benefit of server virtualization for cloud providers is:

- A) Virtualization eliminates the need for physical hardware
- B) Multiple virtual machines can share one physical server, improving hardware utilization (from typical 10–15% to 60–80%) and enabling on-demand provisioning
- C) Virtualization provides automatic encryption for all VM data
- D) Each VM gets guaranteed exclusive access to all CPU resources

**✓ Answer: B**

---

**Q118.** Amazon **S3** (Simple Storage Service) stores objects in **buckets**. The maximum size of a single S3 object (as described in the chapter) is:

- A) 1 GB
- B) 5 GB
- C) 64 MB
- D) 1 TB

**✓ Answer: B**

---

**Q119.** A **workflow** in cloud computing is modeled as a **DAG (Directed Acyclic Graph)**. The **makespan** of a workflow is defined as:

- A) The average execution time of all tasks
- B) The maximum finish time among all exit tasks — the total wall-clock time from start to completion of the entire workflow
- C) The sum of execution times of all tasks
- D) The critical path length minus parallelism overhead

**✓ Answer: B**

---

**Q120.** **Vector clocks** in Amazon Dynamo are used for:

- A) Measuring the precise timestamp of each write operation
- B) Tracking causal relationships between different versions of an object — enabling conflict detection and resolution during concurrent writes
- C) Encrypting stored data using a time-based key
- D) Load balancing read requests across replicas

**✓ Answer: B**

---

**Q121.** The **HPCC (LexisNexis)** system provides two execution environments: **Thor** and **Roxie**. What is the primary difference between them?

- A) Thor handles real-time online queries; Roxie handles batch processing
- B) Thor is a batch-oriented ETL engine optimized for sequential large-volume data processing; Roxie is an online data delivery engine for sub-second query response on pre-built indexes
- C) Thor uses Hadoop; Roxie uses MapReduce
- D) Thor and Roxie are alternative names for the same execution engine

**✓ Answer: B**

---

**Q122.** In **ECL (Enterprise Control Language)** used by HPCC, the programming paradigm is:

- A) Object-oriented, similar to Java
- B) Declarative and data-centric — the programmer describes what data transformations are needed, not how to execute them imperatively
- C) Procedural, similar to C
- D) Logic-based, similar to Prolog

**✓ Answer: B**

---

**Q123.** **SOA (Service-Oriented Architecture)** in cloud computing is based on standards including:

- A) HTTP, FTP, and SMTP
- B) WSDL (Web Services Description Language), SOAP (message protocol), and UDDI (Universal Description, Discovery and Integration)
- C) TCP/IP, UDP, and ICMP
- D) HTML5, CSS3, and JavaScript

**✓ Answer: B**

---

**Q124.** Cloud computing's **autonomous system** property means:

- A) The system requires no human administrators to operate
- B) The cloud infrastructure self-manages transparently — software and data reconfigure automatically without user intervention
- C) Autonomous agents mine cloud data for business intelligence
- D) Each virtual machine operates independently with no shared resources

**✓ Answer: B**

---

**Q125.** The **Web 2.0 Mashup** concept in cloud computing enables:

- A) Cloud providers to charge based on web page views
- B) Dynamic aggregation and integration of content from multiple web services into a single application — leveraging user collaboration and creativity
- C) Secure communication between cloud data centers using HTTPS only
- D) Version control for cloud-hosted applications

**✓ Answer: B**

---

**Q126.** **Gossip-based failure detection** in Amazon Dynamo works by:

- A) Sending regular heartbeat messages from every node to every other node
- B) Propagating knowledge of node failures through client requests — when a client fails to reach a node, that failure information spreads through the system incrementally
- C) Using a central monitoring server to detect and report failures
- D) Checking node liveness only during scheduled maintenance windows

**✓ Answer: B**

---

**Q127.** In cloud security, **VM isolation** ensures that:

- A) No two VMs can be hosted on the same physical machine
- B) One VM's memory, storage, and network traffic cannot be accessed by other VMs co-located on the same physical host — preventing data leakage between tenants
- C) VMs are automatically encrypted at rest
- D) VM migration between physical hosts is disabled for security

**✓ Answer: B**

---

**Q128.** The **data locality** advantage in HDFS means that:

- A) All data is stored in a single geographic location
- B) By scheduling computation (MapReduce tasks) on the nodes where data blocks reside, network transfers are minimized — improving throughput for large-scale analytics
- C) Data is replicated to the node nearest the user geographically
- D) Local SSDs are used instead of spinning disks for all data storage

**✓ Answer: B**

---

**Q129.** In cloud pricing, **bandwidth cost** refers to charges for:

- A) The number of CPU cores provisioned for compute instances
- B) Data transferred into and out of the cloud (ingress/egress) — typically measured in GB and charged at rates like $0.10–$0.17/GB for outgoing bandwidth
- C) The number of API calls made to cloud services
- D) Storage transactions (PUT/GET operations per request)

**✓ Answer: B**

---

**Q130.** **Dynamic orchestration** in cloud IaaS monitors which metric to trigger automatic resource scaling?

- A) Network packet loss rate
- B) CPU utilization — resources are automatically added when CPU exceeds thresholds and removed when underutilized, maintaining SLA compliance
- C) Available disk space on each VM
- D) Number of active user sessions

**✓ Answer: B**

---

**Q131.** The **Hadoop NameNode** serves a function analogous to the **GFS Master**. If the NameNode fails:

- A) Data is automatically recovered from DataNode replicas without interruption
- B) The entire HDFS becomes inaccessible because all filesystem metadata (file-to-block mapping, block locations) is stored only on the NameNode — this is the single point of failure addressed by HDFS HA (High Availability)
- C) A secondary NameNode automatically takes over as the primary
- D) DataNodes continue serving cached data indefinitely

**✓ Answer: B**

---

**Q132.** **Multi-tenancy** introduces a security concern called **co-location risk**. This refers to:

- A) Physical hardware failures caused by overloading multiple VMs on one server
- B) The possibility that a malicious tenant could exploit shared hardware or hypervisor vulnerabilities to access other tenants' data or disrupt their operations
- C) Performance degradation when too many tenants share the same network switch
- D) Legal liability when multiple organizations share the same cloud infrastructure

**✓ Answer: B**

---

**Q133.** **OAuth** is listed as a cloud security standard. Its primary function is:

- A) Encrypting data at rest in cloud storage
- B) Authorization delegation — allowing a user to grant third-party applications limited access to their resources without sharing credentials
- C) Authenticating physical access to data centers
- D) Digitally signing API requests for non-repudiation

**✓ Answer: B**

---

**Q134.** The **xFS (Serverless File System)** was notable as an early distributed file system for which innovation?

- A) Being the first file system to use replication for fault tolerance
- B) Dynamic structure with load-aware data migration — data was automatically moved to improve access locality without a central metadata server
- C) Using encryption for all stored data
- D) Being implemented entirely in hardware

**✓ Answer: B**

---

**Q135.** In cloud computing, **SLA (Service Level Agreement)** for IaaS typically specifies:

- A) The source code of the cloud provider's virtualization software
- B) Guaranteed performance metrics (availability percentage, response time, throughput), and remedies if the provider fails to meet them — e.g., 99.99% uptime
- C) The exact physical location of all data centers used
- D) The maximum number of tenants sharing each physical server

**✓ Answer: B**

---

**Q136.** **Grid computing** differs from cloud computing in that:

- A) Grid computing is newer and more scalable than cloud computing
- B) Grid computing aggregates geographically distributed heterogeneous resources (often academic/research clusters) with complex job scheduling; cloud computing provides simple, elastic, on-demand services with usage-based pricing and a unified management interface
- C) Grid computing uses virtualization; cloud computing does not
- D) Grid computing is cheaper than cloud computing for all workloads

**✓ Answer: B**

---

## SECTION E — Internet of Things (Questions 137–170)

---

**Q137.** In the **CoAP protocol**, a **CON (Confirmable) message** that is not acknowledged is retransmitted with:

- A) Fixed 1-second intervals up to 10 retransmissions
- B) Exponential back-off — the retransmission timeout doubles each time, up to a maximum of 4 retransmissions
- C) Linear back-off — each retry waits 1 second longer than the previous
- D) Immediate retransmission until acknowledged

**✓ Answer: B**

---

**Q138.** In **CoAP**, the default port for unsecured communication is **5683** and for **CoAPS** (DTLS-secured) is:

- A) 443
- B) 5684
- C) 8080
- D) 1883

**✓ Answer: B**

---

**Q139.** The **CoAP Observe** option (RFC 7641) enables the **publish-subscribe** pattern over CoAP. A client registers to observe a resource by sending a GET request with Observe option value:

- A) 255
- B) 0
- C) 1
- D) Any non-zero value

**✓ Answer: B**

---

**Q140.** In **CoAP block-wise transfer** (RFC 7959), the **Block2** option is used with which HTTP method equivalent?

- A) POST (breaking up request payload)
- B) GET (breaking up response payload)
- C) PUT (breaking up PUT request body)
- D) DELETE (confirming chunk deletion)

**✓ Answer: B**

---

**Q141.** In a CoAP message, the **Token** field serves a different purpose from the **Message-ID**. What is the Token's purpose?

- A) Ensuring reliable delivery with ACK matching
- B) Matching requests with responses when a client sends multiple concurrent requests — the token is set by the client and echoed back in the response
- C) Identifying the CoAP version being used
- D) Specifying the content format of the payload

**✓ Answer: B**

---

**Q142.** The **CoAP option delta encoding** uses delta encoding of option numbers to reduce overhead. An option with delta = **13** in the option header means:

- A) The option number is exactly 13
- B) A 1-byte extension follows the header byte, and the actual delta = 13 + the extension byte value (covering option numbers 13–268)
- C) The option is the 13th option in the list
- D) The option payload is 13 bytes long

**✓ Answer: B**

---

**Q143.** **IEEE 802.11ah (Wi-Fi HaLow)** operates in the **sub-GHz band (~900 MHz)** for IoT. Its key advantage over standard Wi-Fi for IoT deployments is:

- A) Higher data rates (multi-Gbps) for video streaming
- B) Extended range (approximately twice that of conventional Wi-Fi), ability to associate >8,000 devices within 1 km, and better penetration through obstacles
- C) Lower latency than all other IoT protocols
- D) Zero power consumption using energy harvesting

**✓ Answer: B**

---

**Q144.** **BLE (Bluetooth Low Energy) GATT (Generic Attribute Profile)** is designed for:

- A) Establishing and managing Bluetooth connections (advertising, scanning, pairing)
- B) Efficient sensor data collection — defining a client-server model where attributes (sensor readings) are organized in a hierarchy of Services and Characteristics
- C) Multi-hop mesh routing between BLE devices
- D) Cryptographic key exchange during BLE pairing

**✓ Answer: B**

---

**Q145.** In **BLE from v5.0**, **connectionless services** were introduced. This enables:

- A) BLE devices to operate without any Bluetooth hardware
- B) Location, navigation, and data broadcasting without the need for pairing or connection establishment — reducing overhead for broadcast-only IoT scenarios
- C) BLE to connect to non-Bluetooth devices directly
- D) Eliminating the need for the GAP advertising mechanism

**✓ Answer: B**

---

**Q146.** **IEEE 802.15.4e TSCH (Time-Slotted Channel Hopping)** combines two techniques. What are they?

- A) OFDM modulation and MIMO antenna arrays
- B) Time-division multiple access (TDMA) scheduling for deterministic slot access, and frequency hopping across channels to combat interference and multipath fading
- C) Spread-spectrum coding and error correction codes
- D) CSMA/CA and frequency hopping

**✓ Answer: B**

---

**Q147.** In **6LoWPAN header compression (IPHC)**, the IPv6 header is compressed from **40 bytes** to approximately:

- A) 20 bytes
- B) 2–3 bytes using stateless compression (IPHC context sharing, link-local address inference from MAC)
- C) 10 bytes
- D) 32 bytes

**✓ Answer: B**

---

**Q148.** The **AMQP Fanout exchange** type in RabbitMQ routes messages to:

- A) Only the queue with the matching routing key
- B) All queues bound to the exchange regardless of the routing key — broadcast delivery to all consumers
- C) A single queue selected by round-robin load balancing
- D) The queue with the fewest unprocessed messages

**✓ Answer: B**

---

**Q149.** **SIP (Session Initiation Protocol)** session setup follows a **3-way handshake** consisting of:

- A) SYN → SYN-ACK → ACK (identical to TCP)
- B) INVITE → 200 OK → ACK — after which the media session begins using parameters negotiated via SDP in the INVITE/200 OK bodies
- C) REGISTER → 200 OK → SUBSCRIBE
- D) OPTIONS → INVITE → BYE

**✓ Answer: B**

---

**Q150.** The **IPv6 SLAAC (Stateless Address Autoconfiguration)** mechanism allows IoT devices to configure their IPv6 address from:

- A) A DHCP server that assigns addresses centrally
- B) The network prefix (advertised by a router) combined with the device's MAC address (EUI-64 format) — enabling zero-configuration IP addressing
- C) A random 128-bit number generated by the device
- D) The device's manufacturer serial number encoded as IPv6

**✓ Answer: B**

---

**Q151.** **WSN (Wireless Sensor Network)** used a **data-centric paradigm** rather than the address-centric IP paradigm. This means:

- A) Each sensor has a unique IP address for direct query
- B) Data is identified and routed based on its content/type rather than the address of its source — the sink queries for "temperature > 30°C" not for "sensor 42"
- C) All sensors broadcast data to all nodes continuously
- D) Data is processed only at centralized base stations

**✓ Answer: B**

---

**Q152.** The **ZigBee** protocol was named after:

- A) The inventor of IEEE 802.15.4
- B) The cooperative, distributed behavior of bees — analogous to how ZigBee devices cooperatively relay data in a mesh network
- C) The zigzag routing pattern used in multi-hop networks
- D) The zero-latency goal for industrial IoT applications

**✓ Answer: B**

---

**Q153.** **G3-PLC (Power Line Communication)** standard specifies operation in the:

- A) 2.4 GHz ISM band
- B) 35–91 kHz (CENELEC A band), using existing electrical cables as communication medium — suitable for smart grid applications
- C) 900 MHz sub-GHz band
- D) 5 GHz unlicensed band

**✓ Answer: B**

---

**Q154.** In the **IoT application domain**, **Industrial IoT (IIoT)** has more stringent requirements than consumer IoT. The key difference is:

- A) IIoT uses lower data rates than consumer IoT
- B) IIoT requires sub-millisecond real-time response and extreme reliability (beyond "best effort" Internet), as failures can be safety-critical
- C) IIoT devices never use wireless communication
- D) IIoT always uses IPv4 for compatibility with legacy industrial systems

**✓ Answer: B**

---

**Q155.** **Edge computing** moves processing to the network edge primarily to address which limitation of cloud-only IoT architectures?

- A) Cloud storage cost is too high for IoT data
- B) Latency and bandwidth constraints — sending all raw sensor data to the cloud introduces unacceptable latency for real-time control and wastes bandwidth; edge nodes pre-process data locally
- C) Cloud providers do not support IoT protocols like CoAP
- D) Security requirements prohibit sending IoT data to public clouds

**✓ Answer: B**

---

**Q156.** In **CoAP resource discovery**, a client discovers available resources on a server by sending a GET request to:

- A) coap://server/resources/all
- B) coap://server/.well-known/core — the server returns a CoRE Link Format document listing all available resources with their attributes
- C) coap://server/api/v1/discover
- D) coap://server/iot/manifest

**✓ Answer: B**

---

**Q157.** **HTTP/2 (2015)** introduced several improvements over HTTP/1.1. Which feature eliminates head-of-line blocking for multiple concurrent requests?

- A) HPACK header compression
- B) Binary framing with multiplexing — multiple requests/responses are interleaved as frames over a single TCP connection without blocking each other
- C) Server push for pre-loading resources
- D) Mandatory TLS (HTTPS) enforcement

**✓ Answer: B**

---

**Q158.** In **IEEE 802.15.4**, an **FFD (Full Function Device)** differs from an **RFD (Reduced Function Device)** in that:

- A) FFDs transmit at higher power levels
- B) FFDs can act as PAN coordinators and route data between nodes; RFDs are leaf nodes that can only communicate with one FFD
- C) FFDs use 128-bit MAC addresses; RFDs use 16-bit addresses
- D) FFDs use OQPSK modulation; RFDs use BPSK modulation

**✓ Answer: B**

---

**Q159.** The **"Smart Grid"** IoT application domain uses PLC (Power Line Communication) at **3–148 kHz** with a maximum rate of:

- A) 1 Mbps
- B) Less than 50 kbps — sufficient for smart meter reporting but much lower than wireless alternatives
- C) 10 Mbps
- D) 250 kbps (same as IEEE 802.15.4)

**✓ Answer: B**

---

**Q160.** **TCP** is generally avoided for IoT devices because of three specific problems. Which is NOT a standard reason TCP is avoided for IoT?

- A) Connection setup overhead (3-way handshake)
- B) Incompatibility with duty-cycling (sleeping nodes)
- C) Retransmission and windowing are too heavyweight for constrained devices
- D) TCP does not support IPv6

**✓ Answer: D** → TCP fully supports IPv6; the other three are valid IoT objections

---

**Q161.** In the **CoAP protocol stack**, the messaging layer provides which services?

- A) HTTP method translation and URI parsing
- B) Reliability (for CON messages), deduplication (detecting duplicate messages using Message-ID), and congestion control
- C) IPv6 header compression and fragmentation
- D) Application-layer security using DTLS certificates

**✓ Answer: B**

---

**Q162.** **Bluetooth 5.0 (2016)** improved upon Bluetooth 4.x in which key metrics relevant to IoT?

- A) Increased power consumption for faster data rates
- B) 50 Mbps data rate, 240 m range (vs. 25 Mbps/10 m for BT 3.0), and support for connectionless location/navigation services
- C) Eliminated BLE and returned to classic Bluetooth only
- D) Reduced maximum number of paired devices from 7 to 3

**✓ Answer: B**

---

**Q163.** The **CoAP HTTP proxy** maps CoAP URIs to HTTP URIs. The CoAP response code **2.05 Content** maps to the HTTP response code:

- A) 201 Created
- B) 200 OK
- C) 204 No Content
- D) 404 Not Found

**✓ Answer: B**

---

**Q164.** In **IoT smart city** applications, the "city as a living organism" metaphor implies that:

- A) Cities replace human decision-makers with AI systems
- B) IoT infrastructure continuously collects and disseminates status data from all city systems (traffic, utilities, environment), enabling data-driven management and citizen services
- C) Smart city IoT devices communicate exclusively using biological-inspired neural networks
- D) All city services are relocated to cloud data centers

**✓ Answer: B**

---

**Q165.** The **CoAP Observe** notification mechanism sends updates using which message type to avoid overwhelming the observer with ACK requirements?

- A) CON messages exclusively
- B) NON (Non-confirmable) messages for periodic/frequent updates — avoiding ACK overhead; CON may be used selectively for reliability
- C) RST messages to signal state changes
- D) ACK messages containing the resource state

**✓ Answer: B**

---

**Q166.** **ZigBee's** network layer adds what capability beyond IEEE 802.15.4?

- A) Physical layer modulation at 2.4 GHz
- B) Multi-hop mesh routing — ZigBee coordinator and routers (FFDs) can relay packets across the network, extending range beyond direct radio links
- C) Security encryption at the physical layer
- D) Bluetooth backward compatibility

**✓ Answer: B**

---

**Q167.** IPv4 required **NAT (Network Address Translation)** for IoT because IPv4 addresses were exhausted. NAT is problematic for IoT because:

- A) NAT is incompatible with UDP protocols
- B) NAT breaks the end-to-end connectivity model — devices behind NAT cannot be directly addressed or reached by other nodes without complex port-forwarding or hole-punching
- C) NAT adds 100ms or more of latency to every packet
- D) NAT cannot translate between IPv4 and IPv6

**✓ Answer: B**

---

**Q168.** In **6LoWPAN**, **mesh addressing** enables:

- A) IPv6 packets to be compressed to under 10 bytes
- B) Multi-hop forwarding at the adaptation layer — a 6LoWPAN frame carries the final destination address so intermediate nodes can forward the packet without IPv6 routing
- C) Direct communication between 6LoWPAN devices and the public Internet without a gateway
- D) Time synchronization between all nodes in the network

**✓ Answer: B**

---

**Q169.** **AMQP persistent queues** in RabbitMQ differ from transient queues in that:

- A) Persistent queues have higher throughput than transient queues
- B) Persistent queues survive consumer disconnection and broker restart — messages are written to disk rather than held only in memory
- C) Persistent queues support only one consumer at a time
- D) Persistent queues require SSL for all connections

**✓ Answer: B**

---

**Q170.** The **IoT "precision agriculture" (Smart Farming)** application uses IoT for:

- A) Replacing farm workers with humanoid robots controlled over the Internet
- B) Environmental monitoring (soil moisture, temperature, humidity) and remote actuation of irrigation systems based on sensor data — enabling data-driven crop management
- C) Blockchain-based tracking of food supply chains only
- D) Satellite-based GPS tracking of farm equipment

**✓ Answer: B**

---

## SECTION F — Fundamentals of Multimedia (Questions 171–200)

---

**Q171.** For **CD-quality audio** (16-bit, stereo, 44,100 Hz sampling rate), the uncompressed bit rate is:

- A) 705,600 bps
- B) 1,411,200 bps
- C) 44,100 bps
- D) 352,800 bps

**✓ Answer: B** → 16 bits × 2 channels × 44,100 samples/s = 1,411,200 bps

---

**Q172.** **SQNR = 6.02N + 1.76 dB** for a sinusoidal input with N-bit quantization. For **8-bit audio**, the SQNR is approximately:

- A) 6.02 dB
- B) 49.92 dB
- C) 96.33 dB
- D) 48 dB

**✓ Answer: B** → 6.02×8 + 1.76 = 48.16 + 1.76 ≈ 49.92 dB

---

**Q173.** **µ-law companding** (used in North America and Japan, ITU-T G.711) uses µ=255. The purpose of companding is to:

- A) Increase the maximum sampling rate for telephony
- B) Apply nonlinear quantization that allocates more quantization levels to low-amplitude signals (where the ear is more sensitive), improving perceived audio quality over uniform quantization
- C) Convert analog audio to digital using OFDM
- D) Encrypt telephone conversations at the physical layer

**✓ Answer: B**

---

**Q174.** In the **YCbCr color space** used by JPEG and MPEG, the luminance component **Y** is computed as:

- A) Y = (R + G + B) / 3
- B) Y ≈ 0.299R + 0.587G + 0.114B — weighted sum where green contributes most because human vision is most sensitive to green wavelengths
- C) Y = max(R, G, B)
- D) Y = R − G

**✓ Answer: B**

---

**Q175.** **4:2:0 chroma subsampling** (used in H.264, MPEG, DVD) means:

- A) No subsampling — full resolution for all three channels
- B) Cb and Cr are each subsampled by a factor of 2 in both horizontal and vertical directions — Cb/Cr resolution is 1/4 of Y resolution
- C) Cb is subsampled horizontally only; Cr is not subsampled
- D) Only Cb is stored; Cr is reconstructed from Y and Cb

**✓ Answer: B**

---

**Q176.** The **Huffman coding algorithm** builds a code tree bottom-up. Given symbols with probabilities {A:0.5, B:0.25, C:0.125, D:0.125}, the optimal average code length is:

- A) 2 bits/symbol
- B) 1.75 bits/symbol
- C) 2.5 bits/symbol
- D) 1.5 bits/symbol

**✓ Answer: B** → A=1bit, B=2bits, C=3bits, D=3bits; avg = 0.5×1 + 0.25×2 + 0.125×3 + 0.125×3 = 0.5+0.5+0.375+0.375 = 1.75

---

**Q177.** **Arithmetic coding** differs from Huffman coding in that:

- A) Arithmetic coding is faster to encode and decode
- B) Arithmetic coding encodes the entire message as a single number in [0,1), achieving average code length arbitrarily close to the entropy — outperforming Huffman when symbols have probabilities that are not exact powers of 1/2
- C) Arithmetic coding uses a static codebook that never adapts to data
- D) Arithmetic coding requires the entire alphabet to have equal probabilities

**✓ Answer: B**

---

**Q178.** **LZW (Lempel-Ziv-Welch)** dictionary coding builds a dictionary during encoding. The decoder:

- A) Receives the complete dictionary from the encoder before decoding begins
- B) Reconstructs the same dictionary during decoding (without explicitly receiving it) by following the same dictionary-building rules — the dictionary is implicit in the compressed stream
- C) Uses a fixed universal dictionary pre-loaded at installation
- D) Requires the encoder to send the dictionary as a separate file

**✓ Answer: B**

---

**Q179.** In **JPEG compression**, the **quantization step** after DCT is the only lossy operation. Increasing the quantization step sizes (lower quality factor Q):

- A) Increases file size while improving image quality
- B) Increases compression ratio but reduces image quality — more DCT coefficients are rounded to zero, producing blocking artifacts at high compression
- C) Has no effect on image quality, only on file size
- D) Removes only the DC coefficient, preserving all AC coefficients

**✓ Answer: B**

---

**Q180.** **JPEG2000** differs from JPEG in using **wavelet transform** instead of DCT. A key advantage of JPEG2000 is:

- A) Faster encoding speed due to simpler mathematics
- B) Resolution scalability — a single compressed file can be progressively decoded at multiple resolutions without re-encoding; also supports lossless and lossy compression in one standard
- C) Better compatibility with legacy JPEG decoders
- D) Smaller file sizes than JPEG at all quality levels

**✓ Answer: B**

---

**Q181.** **Motion compensation** in video compression (H.261, MPEG, H.264) reduces temporal redundancy by:

- A) Storing complete frames at regular intervals (I-frames only)
- B) Encoding only the difference (residual) between the current frame and a motion-predicted version of a reference frame — motion vectors describe how blocks moved
- C) Applying DCT to pairs of consecutive frames simultaneously
- D) Quantizing all frames equally regardless of motion content

**✓ Answer: B**

---

**Q182.** In **MPEG-1/2**, the three frame types are **I, P, and B frames**. A **B-frame (Bidirectional)** differs from a P-frame in that:

- A) B-frames use only DCT compression with no motion vectors
- B) B-frames reference both a past frame and a future frame for motion compensation — achieving higher compression but requiring buffering and out-of-order encoding/decoding
- C) B-frames are always larger than I-frames
- D) B-frames use motion compensation from only the immediately preceding frame

**✓ Answer: B**

---

**Q183.** **H.264/AVC variable block-size motion compensation** can use blocks as small as:

- A) 16×16 macroblocks only
- B) 4×4 pixels — smaller blocks provide more precise motion description for complex motion regions, improving coding efficiency
- C) 8×8 pixels minimum
- D) 32×32 pixels for background regions

**✓ Answer: B**

---

**Q184.** **H.265/HEVC** achieves approximately **2× better compression** than H.264 at the same quality. The fundamental architectural change is the use of:

- A) Larger DCT transforms (up to 32×32)
- B) CTU (Coding Tree Units) up to 64×64 pixels with recursive quad-tree partitioning — replacing H.264's fixed macroblock structure for more flexible adaptation to image content
- C) Replacing motion compensation with optical flow estimation
- D) Using B-frames exclusively (no I or P frames)

**✓ Answer: B**

---

**Q185.** **MPEG-7 (Multimedia Content Description Interface)** is different from all other MPEG standards because:

- A) It compresses audio at higher rates than MP3
- B) It standardizes description (metadata) of multimedia content — enabling efficient search, filtering, browsing, and retrieval — not compression
- C) It defines the network transport protocol for multimedia streaming
- D) It specifies video coding for ultra-high-definition 8K content

**✓ Answer: B**

---

**Q186.** **MP3 (MPEG-1 Audio Layer III)** audio compression exploits **psychoacoustic masking**. This means:

- A) Sounds above 20 kHz are removed since humans cannot hear them
- B) Loud sounds at one frequency mask (make inaudible) quieter sounds at nearby frequencies — MP3 allocates fewer bits to masked components since they are perceptually irrelevant
- C) All audio below 80 dB is discarded as inaudible
- D) Stereo channels are averaged into a single mono channel

**✓ Answer: B**

---

**Q187.** **RTP (Real-Time Transport Protocol)** sequence numbers serve which purpose?

- A) Encrypting the payload to prevent eavesdropping
- B) Detecting packet loss and reordering at the receiver — packets are reassembled in correct order, and gaps identify lost packets for error concealment
- C) Compressing the RTP header to reduce overhead
- D) Authenticating the source of media streams

**✓ Answer: B**

---

**Q188.** **RTCP (RTP Control Protocol)** is used alongside RTP to provide:

- A) Reliable retransmission of lost RTP packets
- B) Quality-of-service feedback (packet loss rate, jitter, delay), synchronization between audio/video streams, and identification of participants in a multimedia session
- C) Encryption of the RTP media payload
- D) Flow control by adjusting sender bit rate automatically

**✓ Answer: B**

---

**Q189.** **DASH (Dynamic Adaptive Streaming over HTTP)** adapts video quality by:

- A) Buffering the entire video before playback begins
- B) Segmenting video into multiple chunks encoded at different bitrates — the client selects the appropriate quality segment based on measured network bandwidth, avoiding buffering stalls
- C) Using UDP instead of HTTP for lower latency
- D) Sending a separate audio stream and video stream that the client mixes

**✓ Answer: B**

---

**Q190.** In **Content-Based Image Retrieval (CBIR)**, the **color histogram** feature represents:

- A) The spatial arrangement of colors in an image
- B) The distribution of pixel colors — how many pixels fall into each color bin — regardless of their spatial position; invariant to rotation and translation
- C) The dominant color of the single most common region
- D) The sequence of colors along the image border

**✓ Answer: B**

---

**Q191.** **Gamma correction** (sRGB, γ=2.2) is applied during image capture to:

- A) Increase the image resolution before storage
- B) Pre-distort the captured signal (R' = R^(1/γ)) so that when a CRT display raises it back to power γ, the overall system response is linear — matching human perceptual sensitivity
- C) Compress the image by reducing color depth
- D) Convert the image from RGB to YCbCr color space

**✓ Answer: B**

---

**Q192.** In the **CIE color model**, the **Y** tristimulus value specifically represents:

- A) The blue component of color
- B) Luminance — the perceptual brightness of a color stimulus — making Y the most important component for visual quality
- C) The chromaticity coordinate on the x-axis
- D) The saturation of the color

**✓ Answer: B**

---

**Q193.** A **1920×1080** uncompressed video at **30 fps** with **24-bit color** requires approximately:

- A) 186 Mbps
- B) 1.49 Gbps
- C) 4 Mbps
- D) 100 Mbps

**✓ Answer: B** → 1920×1080×24×30 = 1,492,992,000 bps ≈ 1.49 Gbps

---

**Q194.** The **NTSC** video standard uses which frame rate?

- A) 25 fps (exact)
- B) 29.97 fps (525 lines/frame, used in North America and Japan)
- C) 50 fps (used in Europe)
- D) 60 fps (progressive scan only)

**✓ Answer: B**

---

**Q195.** **DPCM (Differential Pulse Code Modulation)** achieves compression by encoding:

- A) The absolute sample value f_n using PCM
- B) The prediction error d_n = f_n − f̂_n — the difference between the actual sample and its predicted value — which has lower variance than the original signal and requires fewer bits
- C) The ratio of consecutive sample values
- D) The DCT coefficients of a block of audio samples

**✓ Answer: B**

---

**Q196.** In **Video-on-Demand (VoD)** distribution, a **Content Delivery Network (CDN)** improves user experience by:

- A) Storing all video content on a single powerful origin server
- B) Replicating content at geographically distributed proxy servers (edge nodes) close to users — reducing latency, server load, and bandwidth costs by serving content from the nearest edge node
- C) Compressing video to lower quality before delivery
- D) Encrypting video streams to prevent unauthorized access

**✓ Answer: B**

---

**Q197.** **GIF format** uses **LZW compression** and supports a maximum palette of:

- A) 16 colors
- B) 256 colors (8-bit palette) — suitable for simple graphics, icons, and animations but not for photographic images requiring millions of colors
- C) 65,536 colors (16-bit)
- D) 16,777,216 colors (24-bit)

**✓ Answer: B**

---

**Q198.** **3D stereoscopic video** creates the perception of depth using **disparity**. Positive parallax means:

- A) The object appears to protrude in front of the screen toward the viewer
- B) The object appears to recede behind the screen — left and right view images of the object diverge beyond the screen plane
- C) The object has zero depth and appears on the screen surface
- D) The object is too close for comfortable stereoscopic viewing

**✓ Answer: B**

---

**Q199.** The **Shannon Coding Theorem** establishes that for any lossless code with average length l̄ and source entropy η:

- A) l̄ = η exactly for optimal codes
- B) η ≤ l̄ < η + 1 — the average code length is at least the entropy but never more than one bit above it for Huffman codes
- C) l̄ ≥ 2η always
- D) l̄ can be made arbitrarily close to η/2 with block coding

**✓ Answer: B**

---

**Q200.** **MPEG-4 AAC (Advanced Audio Coding)** achieves better quality than MP3 at lower bit rates because:

- A) AAC uses a higher sampling rate than MP3
- B) AAC uses more sophisticated psychoacoustic models, a pure MDCT filterbank (instead of MP3's hybrid filterbank), better temporal noise shaping (TNS), and improved Huffman coding — eliminating aliasing artifacts present in MP3
- C) AAC requires higher processing power that was not available when MP3 was designed
- D) AAC stores audio as uncompressed PCM with metadata

**✓ Answer: B**

---

## Complete Answer Key — 200 Questions

| Q | A | Q | A | Q | A | Q | A | Q | A |
|---|---|---|---|---|---|---|---|---|---|
| 1 | B | 41 | B | 81 | B | 121 | B | 161 | B |
| 2 | B | 42 | C | 82 | B | 122 | B | 162 | B |
| 3 | B | 43 | B | 83 | B | 123 | B | 163 | B |
| 4 | B | 44 | B | 84 | B | 124 | B | 164 | B |
| 5 | B | 45 | B | 85 | B | 125 | B | 165 | B |
| 6 | B | 46 | B | 86 | B | 126 | B | 166 | B |
| 7 | B | 47 | A | 87 | A | 127 | B | 167 | B |
| 8 | B | 48 | B | 88 | B | 128 | B | 168 | B |
| 9 | B | 49 | C | 89 | B | 129 | B | 169 | B |
| 10 | C | 50 | B | 90 | B | 130 | B | 170 | B |
| 11 | A | 51 | B | 91 | B | 131 | B | 171 | B |
| 12 | B | 52 | B | 92 | B | 132 | B | 172 | B |
| 13 | B | 53 | B | 93 | B | 133 | B | 173 | B |
| 14 | B | 54 | B | 94 | B | 134 | B | 174 | B |
| 15 | B | 55 | B | 95 | B | 135 | B | 175 | B |
| 16 | B | 56 | B | 96 | B | 136 | B | 176 | B |
| 17 | C | 57 | B | 97 | B | 137 | B | 177 | B |
| 18 | B | 58 | B | 98 | B | 138 | B | 178 | B |
| 19 | C | 59 | B | 99 | B | 139 | B | 179 | B |
| 20 | B | 60 | C | 100 | B | 140 | B | 180 | B |
| 21 | B | 61 | C | 101 | B | 141 | B | 181 | B |
| 22 | B | 62 | B | 102 | B | 142 | B | 182 | B |
| 23 | B | 63 | B | 103 | B | 143 | B | 183 | B |
| 24 | B | 64 | B | 104 | B | 144 | B | 184 | B |
| 25 | B | 65 | A | 105 | B | 145 | B | 185 | B |
| 26 | B | 66 | B | 106 | B | 146 | B | 186 | B |
| 27 | B | 67 | B | 107 | B | 147 | B | 187 | B |
| 28 | B | 68 | B | 108 | B | 148 | B | 188 | B |
| 29 | B | 69 | B | 109 | B | 149 | B | 189 | B |
| 30 | D | 70 | B | 110 | B | 150 | B | 190 | B |
| 31 | B | 71 | B | 111 | B | 151 | B | 191 | B |
| 32 | B | 72 | B | 112 | B | 152 | B | 192 | B |
| 33 | B | 73 | C | 113 | B | 153 | B | 193 | B |
| 34 | B | 74 | B | 114 | B | 154 | B | 194 | B |
| 35 | C | 75 | B | 115 | B | 155 | B | 195 | B |
| 36 | B | 76 | B | 116 | B | 156 | B | 196 | B |
| 37 | D | 77 | B | 117 | B | 157 | B | 197 | B |
| 38 | B | 78 | B | 118 | B | 158 | B | 198 | B |
| 39 | B | 79 | B | 119 | B | 159 | B | 199 | B |
| 40 | A | 80 | B | 120 | B | 160 | D | 200 | B |

---

**200 questions total — distributed as:**
- Deep Learning: Q1–34 (34 questions)
- Cryptography & Network Security: Q35–68 (34 questions)
- Data Mining: Q69–102 (34 questions)
- Cloud Computing: Q103–136 (34 questions)
- Internet of Things: Q137–170 (34 questions)
- Multimedia: Q171–200 (30 questions)

Combined with the first 60 questions, you now have **260 PhD-level MCQ questions** covering all 6 books.